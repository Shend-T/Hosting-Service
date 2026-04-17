<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Abonimi;
use Illuminate\Support\Facades\DB;

class AbonimiController extends Controller
{
    // Listo te gjitha abonimet (Read)
    public function index()
    {
        $abonimet = Abonimi::all();
        return response()->json($abonimet);
    }

    // Merr vetem nje abonim ne baze te ID (Read)
    public function show(int $id) {
        $client = Abonimi::findOrFail($id);
        return response()->json($client);
    }

    // Krijo abonim te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'paketa_id'     => 'required|exists:paketa,id',
            'data_fillimit' => 'required|date',
            'data_skadimit' => 'required|date|after_or_equal:data_fillimit',
            'statusi'       => 'sometimes|in:pritje,aktiv,suspenduar,skaduar,ndalur',
            'cmimi'         => 'sometimes|numeric',
            'periudha'      => 'required|in:mujore,vjetore',
            'auto_rinovim'  => 'sometimes|boolean'
        ]);

        $abonimi = Abonimi::create($data);
        return response()->json($abonimi, 201);
    }

    public function userStore(Request $request)
    {
        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'paketa_id'     => 'required|exists:paketa,id',
            'data_fillimit' => 'required|date',
            'data_skadimit' => 'required|date|after_or_equal:data_fillimit',
            'statusi'       => 'sometimes|in:pritje,aktiv,suspenduar,skaduar,ndalur',
            'cmimi'         => 'sometimes|numeric',
            'periudha'      => 'required|in:mujore,vjetore',
            'auto_rinovim'  => 'sometimes|boolean'
        ]);

        $abonimi = Abonimi::create($data);
        return response()->json([
            'message' => 'Jeni abonuar me sukses',
        ], 201);
    }

    // Perditso nje abonim (Update)
    public function update(Request $request, int $id) {
        $abonimi = Abonimi::findOrFail($id);

        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'paketa_id'     => 'required|exists:paketa,id',
            'data_fillimit' => 'required|date',
            'data_skadimit' => 'required|date|after_or_equal:data_fillimit',
            'statusi'       => 'sometimes|in:pritje,aktiv,suspenduar,skaduar,ndalur',
            'cmimi'         => 'sometimes|numeric',
            'periudha'      => 'required|in:mujore,vjetore',
            'auto_rinovim'  => 'sometimes|boolean'
        ]);

        $abonimi->update($data);
        return response()->json($abonimi, 200);
    }

    // Fshij nje abonim (Delete)
    public function destroy(int $id) {
        $abonimi = Abonimi::findOrFail($id);
        $abonimi->delete();
        return response()->json("", 204);
    }

    // Kthe abonimet e user-it specifik
    public function userAbonimi(Request $request)
    {
        $data = Abonimi::where('klienti_id', $request->user()->id)->with('paketa')->get();

        return response()->json($data);
    }

    // metod per me update-u auto_rinovim-in( na duhet per frontend)
    public function toggleAutoRinovim(Request $request, int $id)
    {
        $abonimi = Abonimi::where('id', $id)
            ->where('klienti_id', $request->user()->id)
            ->firstOrFail();

        $abonimi->auto_rinovim = !$abonimi->auto_rinovim;
        $abonimi->save();

        return response()->json($abonimi);
    }
    // njejt edhe per statusin
    public function cancelAbonimi(Request $request, int $id)
    {
        $abonimi = Abonimi::where('id', $id)
            ->where('klienti_id', $request->user()->id)
            ->firstOrFail();

        if ($abonimi->statusi === 'suspenduar' || $abonimi->statusi === 'skaduar') {
            return response()->json([
                'message' => 'Nuk mund te anuloni nje abonim te suspenduar'
            ], 403);
        }

        $abonimi->statusi = 'ndalur';
        $abonimi->save();

        return response()->json($abonimi);
    }
    public function activateAbonimi(Request $request, int $id)
    {
        $abonimi = Abonimi::where('id', $id)
            ->where('klienti_id', $request->user()->id)
            ->firstOrFail();

        if ($abonimi->statusi === 'suspenduar' || $abonimi->statusi === 'skaduar') {
            return response()->json([
                'message' => 'Nuk mund te aktivizoni nje abonim te suspenduar'
            ], 403);
        }

        $abonimi->statusi = 'aktiv';
        $abonimi->save();

        return response()->json($abonimi);
    }

    // Kthe daten e krijimit te abonimit( na duhet per dashboard)
    public function chartData(Request $request)
    {
        $data = Abonimi::where('klienti_id', $request->user()->id)
            ->selectRaw('DAY(created_at) as day, MONTH(created_at) as month, YEAR(created_at) as year, COUNT(*) as total')
            ->groupByRaw('YEAR(created_at), MONTH(created_at), DAY(created_at)')
            ->orderByRaw('YEAR(created_at), MONTH(created_at), DAY(created_at)')
            ->get()
            ->map(function ($item) {
                return [
                    'label' => date('j M Y', mktime(0, 0, 0, $item->month, $item->day, $item->year)),
                    'total' => $item->total,
                ];
            });

        return response()->json($data);
    }
}