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
        ->with(['abonimi.paketa', 'server', 'domains'])
        ->get();

        return response()->json($data);
    }

    // Lexo nje llogari hosting (Read one)
    public function show(LlogariHostings $llogariHostings)
    {
        return response()->json($llogariHostings);
    }

    // Krijo llogari hosting te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'abonimi_id'        => 'required|exists:abonimi,id',
            'server_id'         => 'required|exists:server,id',
            'username'          => 'required|string|max:255',
            'hapesira_perdorur' => 'required|numeric|min:0.01',
            'bandwith_perdorur' => 'required|numeric|min:0.01',
            'data_krijimit'     => 'required|date',
            'statusi'           => 'sometimes|in:aktiv,jo-aktiv',
            'ip_dedikuar'       => 'required|string|max:255',
        ]);

        $llogariHostings = LlogariHostings::create($data);

        return response()->json($llogariHostings, 201); // Status 201 = Krijuar
    }

    // Përditëso llogari hosting (Update)
    public function update(Request $request, LlogariHostings $llogariHostings)
    {
        $data = $request->validate([
            'abonimi_id'        => 'sometimes|exists:abonimi,id',
            'server_id'         => 'sometimes|exists:server,id',
            'username'          => 'sometimes|string|max:255',
            'hapesira_perdorur' => 'sometimes|numeric|min:0.01',
            'bandwith_perdorur' => 'sometimes|numeric|min:0.01',
            'statusi'           => 'sometimes|in:aktiv,jo-aktiv',
            'ip_dedikuar'       => 'sometimes|string|max:255',
        ]);

        $llogariHostings->update($data);

        return response()->json($llogariHostings);
    }

    // Fshi llogari hosting (Delete)
    public function destroy(LlogariHostings $llogariHostings)
    {
        $llogariHostings->delete();

        return response()->json(null, 204);
    }
}

