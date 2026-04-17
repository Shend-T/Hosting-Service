<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use Illuminate\Http\Request;

class DomainController extends Controller
{
    // Listo cdo domain (Read)
    public function index()
    {
        $domains = Domain::all();          // merr krejt rreshtat
        return response()->json($domains); // kthen JSON
    }

    // Krijo domain te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'emri' => 'required|string|max:255',
            'ip_address' => 'required|ip',
            'statusi' => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'data_skadimit' => 'required|date',
            'klienti_id' => 'required|exists:klienti,id',
        ]);

        $domain = Domain::create($data);

        return response()->json($domain, 201); // Status 201 = Krijuar
    }

    // Lexo nje domain (Read one)
    public function show(Domain $domain)
    {
        return response()->json($domain);
    }

    // Përditëso domain (Update)
    public function update(Request $request, Domain $domain)
    {
        $data = $request->validate([
            'emri' => 'sometimes|required|string|max:255',
            'ip_address' => 'sometimes|required|ip',
            'statusi' => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'data_skadimit' => 'sometimes|required|date',
            'klienti_id' => 'sometimes|required|exists:klienti,id',
        ]);

        $domain->update($data);

        return response()->json($domain);
    }

    // Fshi domain (Delete)
    public function destroy(Domain $domain)
    {
        $domain->delete();

        return response()->json(null, 204);
    }
}

