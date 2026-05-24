<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Klienti;
use App\Models\Paketa;

class AdminController extends Controller
{
    // ========== Klienti ==========
    public function getAllKlienti(Request $request) 
    {
        $klienti = Klienti::all();
        return response()->json($klienti, 200);
    }

    public function getKlienti(int $id) {
        $klienti = Klienti::findOrFail($id);

        return response()->json($klienti, 200);
    }

    public function createKlienti(Request $request) {
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
        
        $klienti = Klienti::create($data);

        return response()->json($klienti, 201);
    }

    public function updateKlienti(Request $request, int $id) {
        $klienti = Klienti::findOrFail($id);

        $data = $request->validate([
            'emri'      => 'required|string|max:255',
            'mbiemri'   => 'required|string|max:255',
            'kompania'  => 'required|string|max:255',
            'email'     => 'required|email|unique:klienti,email,' . $klienti->id,
            'telefoni'  => 'required|string|max:20',
            'adresa'    => 'required|string|max:255',
            'statusi'   => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'bilanci'   => 'nullable|numeric',
        ]);

        $klienti->update($data);

        return response()->json($klienti, 200);
    }

    public function deleteKlienti(int $id) {
        $klienti = Klienti::findOrFail($id);
        $klienti->delete();

        return response()->json("", 204);
    }

    // ========== Paketa ==========
    public function getAllPaketa(Request $request) {
        $paketat = Paketa::all();
        return response()->json($paketat, 200);
    }
    public function createPaketa(Request $request) {
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

        $paketa = Paketa::create($data);

        return response()->json($paketa, 201);
    }

    public function deletePaketa(Request $request, int $id) {
        $paketa = Paketa::findOrFail($id);
        $paketa->delete();

        return response()->json("", 204);
    }
}
