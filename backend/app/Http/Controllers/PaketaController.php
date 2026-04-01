<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paketa;

class PaketaController extends Controller
{
    // Listo cdo paket (Read)
    public function index()
    {
        $packets = Paketa::all();          // merr krejt rreshtat
        return response()->json($packets); // kthen JSON
    }

    // Merr vetem nje pakete ne baze te ID( Read)
    public function show(int $id)
    {
        $packet = Paketa::find($id);

        if ($packet === null) {
            return response()->json([
                'message' => 'Paketa me ket ID nuk u gjet',
            ], 404);
        } else {
            return response()->json($packet);
        }
    }

    // Krijo pakete te rij (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'emri'         => 'required|string|max:255',
            'pershkrimi'   => 'nullable|string',
            'hapesira_gb'  => 'required|integer',
            'bandwidth_gb' => 'required|integer',
            'nr_domaineve' => 'required|integer',
            'nr_emaileve'  => 'required|integer',
            'ssl'          => 'sometimes|boolean',
            'cmimi_mujor'  => 'required|numeric',
            'cmimi_vjetor' => 'required|numeric',
            'statusi'      => 'nullable|in:aktiv,jo-aktiv'
        ]);

        // Krijo pakete
        $packet = Paketa::create($data);

        return response()->json($packet, 201); // Status 201 = Krijuar
    }

    // Perditso nje Klient( Update)
    public function update(Request $request, int $id) {
        $packet = Paketa::findOrFail($id);

        $data = $request->validate([
            'emri'         => 'required|string|max:255',
            'pershkrimi'   => 'nullable|string',
            'hapesira_gb'  => 'required|integer',
            'bandwidth_gb' => 'required|integer',
            'nr_domaineve' => 'required|integer',
            'nr_emaileve'  => 'required|integer',
            'ssl'          => 'sometimes|boolean',
            'cmimi_mujor'  => 'required|numeric',
            'cmimi_vjetor' => 'required|numeric',
            'statusi'      => 'nullable|in:aktiv,jo-aktiv'
        ]);

        $packet->update($data);

        return response()->json($packet, 200);
    }

    // Fshij nje Pakete( Delete)
    public function destroy(int $id) {
        $packet = Paketa::findOrFail($id);
        $packet->delete();

        return response()->json("", 204);
    }
}
