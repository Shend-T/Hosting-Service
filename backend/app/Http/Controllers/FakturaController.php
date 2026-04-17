<?php

namespace App\Http\Controllers;

use App\Models\Faktura;
use Illuminate\Http\Request;
use App\Mail\FakturaEmail;
use Illuminate\Support\Facades\Mail;

class FakturaController extends Controller
{
    public function index()
    {
        return response()->json(Faktura::all());
    }

    public function show(int $id)
    {
        return response()->json(Faktura::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'abonimi_id'    => 'required|exists:abonimi,id',
            'shuma'         => 'required|numeric|min:0',
            'data_leshimit' => 'sometimes|date',
            'data_skadimit' => 'nullable|date|after_or_equal:data_leshimit',
            'statusi'       => 'sometimes|in:paguar,papaguar,anuluar',
            'pershkrimi'    => 'nullable|string',
        ]);

        $faktura = Faktura::create($data);
        $faktura->load('klienti', 'abonimi.paketa');

        // ✅ Send email automatically when invoice is created
        Mail::to($faktura->klienti->email)->send(new FakturaEmail($faktura));

        return response()->json($faktura, 201);
    }

    public function update(Request $request, int $id)
    {
        $faktura = Faktura::findOrFail($id);

        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'abonimi_id'    => 'required|exists:abonimi,id',
            'shuma'         => 'required|numeric|min:0',
            'data_leshimit' => 'sometimes|date',
            'data_skadimit' => 'nullable|date|after_or_equal:data_leshimit',
            'statusi'       => 'sometimes|in:paguar,papaguar,anuluar',
            'pershkrimi'    => 'nullable|string',
        ]);

        $faktura->update($data);
        return response()->json($faktura, 200);
    }

    public function destroy(int $id)
    {
        Faktura::findOrFail($id)->delete();
        return response()->json("", 204);
    }
}