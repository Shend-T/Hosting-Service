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
}
