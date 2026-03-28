<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Abonimi;

class AbonimiController extends Controller
{
    // Listo te gjitha abonimet (Read)
    public function index()
    {
        $abonimet = Abonimi::all();
        return response()->json($abonimet);
    }

    // Krijo abonim te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'paketa_id'     => 'required|exists:paketa,id',
            'data_fillimit' => 'required|date',
            'data_skadimit' => 'required|date|after_or_equal:data_fillimit',
            'statusi'       => 'sometimes|in:pritje,aktiv,suspenduar,skaduar,ndalur',
            'cmimi'         => 'sometimes|numeric',
            'periudha'      => 'required|in:mujore,vjetore',
            'auto_rinovim'  => 'sometimes|boolean'
        ]);

        $abonimi = Abonimi::create($data);
        return response()->json($abonimi, 201);
    }
}
