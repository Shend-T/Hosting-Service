<?php

namespace App\Http\Controllers;

use App\Models\LlogariHosting;
use Illuminate\Http\Request;

class LlogariHostingController extends Controller
{
    // Listo cdo llogari hosting (Read)
    public function index()
    {
        $llogariHostings = LlogariHosting::all(); // merr krejt rreshtat
        return response()->json($llogariHostings); // kthen JSON
    }

    // Krijo llogari hosting te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'emri' => 'required|string|max:255',
            'statusi' => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'hapesira_disk_gb' => 'required|integer|min:0',
            'klienti_id' => 'required|exists:klienti,id',
            'paketa_id' => 'required|exists:paketa,id',
            'server_id' => 'required|exists:servers,id',
        ]);

        $llogariHosting = LlogariHosting::create($data);

        return response()->json($llogariHosting, 201); // Status 201 = Krijuar
    }

    // Lexo nje llogari hosting (Read one)
    public function show(LlogariHosting $llogariHosting)
    {
        return response()->json($llogariHosting);
    }

    // Përditëso llogari hosting (Update)
    public function update(Request $request, LlogariHosting $llogariHosting)
    {
        $data = $request->validate([
            'emri' => 'sometimes|required|string|max:255',
            'statusi' => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'hapesira_disk_gb' => 'sometimes|required|integer|min:0',
            'klienti_id' => 'sometimes|required|exists:klienti,id',
            'paketa_id' => 'sometimes|required|exists:paketa,id',
            'server_id' => 'sometimes|required|exists:servers,id',
        ]);

        $llogariHosting->update($data);

        return response()->json($llogariHosting);
    }

    // Fshi llogari hosting (Delete)
    public function destroy(LlogariHosting $llogariHosting)
    {
        $llogariHosting->delete();

        return response()->json(null, 204);
    }
}

