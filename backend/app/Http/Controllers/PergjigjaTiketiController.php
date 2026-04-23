<?php

namespace App\Http\Controllers;

use App\Models\PergjigjaTiketi;
use Illuminate\Http\Request;

class PergjigjaTiketiController extends Controller
{
    // POST /api/pergjigja_tiketi
    public function store(Request $request)
    {
        $request->validate([
            'tiketi_id' => 'required|exists:tiketis,id',
            'autori'    => 'required|string|max:100',
            'mesazhi'   => 'required|string',
            'pergjigja' => 'required|string',
        ]);

        $pergjigja = PergjigjaTiketi::create([
            'tiketi_id' => $request->tiketi_id,
            'autori'    => $request->autori,
            'mesazhi'   => $request->mesazhi,
            'pergjigja' => $request->pergjigja,
        ]);

        return response()->json($pergjigja, 201);
    }

    // DELETE /api/pergjigja_tiketi/{id}
    public function destroy(int $id)
    {
        PergjigjaTiketi::findOrFail($id)->delete();
        return response()->json("", 204);
    }
}