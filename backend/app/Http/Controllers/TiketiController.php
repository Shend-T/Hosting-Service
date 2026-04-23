<?php

namespace App\Http\Controllers;

use App\Models\Tiketi;
use App\Models\Klienti;
use Illuminate\Http\Request;

class TiketiController extends Controller
{
    // GET /api/tiketa
    public function index()
    {
        $tiketa = Tiketi::with('klienti')->get();
        return response()->json($tiketa);
    }

    // GET /api/tiketa/{id}
    public function show(int $id)
    {
        $tiketi = Tiketi::with(['klienti', 'pergjigjet'])->findOrFail($id);
        return response()->json($tiketi);
    }

    // POST /api/tiketa
    public function store(Request $request)
    {
        $data = $request->validate([
            'klienti_id'  => 'required|exists:klienti,id',
            'llogaria_id' => 'nullable',
            'titulli'     => 'required|string|max:255',
            'pershkrimi'  => 'required|string',
            'prioriteti'  => 'sometimes|in:i_ulet,normal,i_larte,urgjent',
            'kategoria'   => 'required|string',
        ]);

        $tiketi = Tiketi::create($data);
        return response()->json($tiketi, 201);
    }

    // PUT /api/tiketa/{id}
    public function update(Request $request, int $id)
    {
        $tiketi = Tiketi::findOrFail($id);

        $data = $request->validate([
            'titulli'    => 'sometimes|string|max:255',
            'pershkrimi' => 'sometimes|string',
            'prioriteti' => 'sometimes|in:i_ulet,normal,i_larte,urgjent',
            'statusi'    => 'sometimes|in:hapur,ne_proces,mbyllur',
            'kategoria'  => 'sometimes|string',
        ]);

        $tiketi->update($data);
        return response()->json($tiketi);
    }

    // DELETE /api/tiketa/{id}
    public function destroy(int $id)
    {
        Tiketi::findOrFail($id)->delete();
        return response()->json("", 204);
    }
}