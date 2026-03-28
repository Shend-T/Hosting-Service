<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Klienti;

class KlientController extends Controller
{
    // Listo cdo klient (Read)
    public function index()
    {
        $clients = Klienti::all();         // merr krejt rreshtat
        return response()->json($clients); // kthen JSON
    }

    // Krijo Klient te rij (Create)
    public function store(Request $request)
    {
        // Validate input
        $data = $request->validate([
            'emri'      => 'required|string|max:255',
            'mbiemri'   => 'required|string|max:255',
            'kompania'  => 'required|string|max:255',
            'email'     => 'required|email|unique:klienti,email',
            'telefoni'  => 'required|string|max:20',
            'adresa'    => 'required|string|max:255',
            'statusi'   => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'bilanci'   => 'nullable|numeric',
        ]);

        // Krijo klient
        $client = Klienti::create($data);

        return response()->json($client, 201); // Status 201 = Krijuar
    }
}
