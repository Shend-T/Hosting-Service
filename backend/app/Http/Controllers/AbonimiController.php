<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Abonimi;

class AbonimiController extends Controller
{
    // Listo te gjitha abonimet (Read)
    public function index()
    {
        $abonimet = Abonimi::all();
        return response()->json($abonimet);
    }

    // Merr vetem nje abonim ne baze te ID (Read)
    public function show(int $id)
    {
        $abonimi = Abonimi::find($id);

        if ($abonimi === null) {
            return response()->json([
                'message' => 'Abonimi me kete ID nuk u gjet.',
            ], 404);
        }

        return response()->json($abonimi);
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

    // Perditso nje abonim( Update)
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

    // Fshij nje abonim( Delete)
    public function destroy(int $id) {
        $abonimi = Abonimi::findOrFail($id);
        $abonimi->delete();

        return response()->json("", 204);
    }
}
