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

    // Merr vetem nje klient ne baze te ID( Read)
    public function show(int $id) {
        $client = Klienti::findOrFail($id);
        return response()->json($client);
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
            'password'  => 'required|string|min:8',
            'telefoni'  => 'required|string|max:20',
            'adresa'    => 'required|string|max:255',
            'statusi'   => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'bilanci'   => 'nullable|numeric',
        ]);

        // Krijo klient
        $client = Klienti::create($data);

        return response()->json($client, 201); // Status 201 = Krijuar
    }

    // Perditso nje Klient( Update)
    public function update(Request $request, int $id) {
        $client = Klienti::findOrFail($id);

        $data = $request->validate([
            'emri'      => 'required|string|max:255',
            'mbiemri'   => 'required|string|max:255',
            'kompania'  => 'required|string|max:255',
            'email'     => 'required|email|unique:klienti,email,' . $client->id, // sigurohu qe nese email-i nuk ndryshon nuk kthen error
            'password'  => 'required|string|min:8',
            'telefoni'  => 'required|string|max:20',
            'adresa'    => 'required|string|max:255',
            'statusi'   => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'bilanci'   => 'nullable|numeric',
        ]);

        $client->update($data);

        return response()->json($client, 200);
    }

    public function addFunds(Request $request) {
        $data = $request->validate([
            'id'    => 'required|integer|exists:klienti,id',
            'funds' => 'required|numeric|min:0.01',
        ]);

        $client = Klienti::findOrFail($data['id']);
        $client->bilanci += $data['funds'];
        $client->save();

        return response()->json([
            'message' => 'Bilanci u shtua me sukses',
            'bilanci' => $client->bilanci,
        ]);
    }
    public function removeFunds(Request $request) {
        $data = $request->validate([
            'id'    => 'required|integer|exists:klienti,id',
            'funds' => 'required|numeric|min:0.01',
        ]);

        $client = Klienti::findOrFail($data['id']);
        $client->bilanci -= $data['funds'];
        $client->save();

        return response()->json([
            'message' => 'Bilanci u minusua', // spodi naj mezash ma tmenqem qka me qit
            'bilanci' => $client->bilanci,
        ]);
    }

    // Fshij nje Klient( Delete)
    public function destroy(int $id) {
        $client = Klienti::findOrFail($id);
        $client->delete();

        return response()->json("", 204);
    }
}
