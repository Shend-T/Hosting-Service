<?php

namespace App\Http\Controllers;

use App\Models\LlogariHostings;
use Illuminate\Http\Request;
use App\Models\Servers;

class LlogariHostingController extends Controller
{
    // Listo cdo llogari hosting (Read)
    public function index()
    {
        $llogariHostings = LlogariHostings::all(); // merr krejt rreshtat
        return response()->json($llogariHostings); // kthen JSON
    }

    public function userLlogariHostings(Request $request)
    {
        $data = LlogariHostings::whereHas('abonimi', function ($query) use ($request) {
            $query->where('klienti_id', $request->user()->id);
        })
        ->with(['abonimi.paketa', 'server'])
        ->get();

        return response()->json($data);
    }

    // Krijo llogari hosting te ri (Create)
    // public function store(Request $request)
    // {
    //     $data = $request->validate([
    //         'emri' => 'required|string|max:255',
    //         'statusi' => 'nullable|in:aktiv,jo-aktiv,suspenduar',
    //         'hapesira_disk_gb' => 'required|integer|min:0',
    //         'klienti_id' => 'required|exists:klienti,id',
    //         'paketa_id' => 'required|exists:paketa,id',
    //         'server_id' => 'required|exists:servers,id',
    //     ]);

    //     $llogariHostings = LlogariHostings::create($data);

    //     return response()->json($llogariHostings, 201); // Status 201 = Krijuar
    // }

    // Lexo nje llogari hosting (Read one)
    public function show(LlogariHostings $llogariHostings)
    {
        return response()->json($llogariHostings);
    }

    // Përditëso llogari hosting (Update)
    // public function update(Request $request, LlogariHostings $llogariHostings)
    // {
    //     $data = $request->validate([
    //         'emri' => 'sometimes|required|string|max:255',
    //         'statusi' => 'nullable|in:aktiv,jo-aktiv,suspenduar',
    //         'hapesira_disk_gb' => 'sometimes|required|integer|min:0',
    //         'klienti_id' => 'sometimes|required|exists:klienti,id',
    //         'paketa_id' => 'sometimes|required|exists:paketa,id',
    //         'server_id' => 'sometimes|required|exists:servers,id',
    //     ]);

    //     $llogariHostings->update($data);

    //     return response()->json($llogariHostings);
    // }

    // Fshi llogari hosting (Delete)
    public function destroy(LlogariHostings $llogariHostings)
    {
        $llogariHostings->delete();

        return response()->json(null, 204);
    }
}

