<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Klienti;

class AdminController extends Controller
{
    // ========== Klienti ==========
    public function getAllKlienti(Request $request) 
    {
        if ($request->user()->tokenCan("admin")) {
            $clients = Klienti::all();
            \Log::info(gettype($clients));
            return response()->json($clients, 200);
        } else {
            return response()->json(['message' => 'I pa autorizuar'], 403);
        }
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
}
