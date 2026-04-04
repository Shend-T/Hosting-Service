<?php

namespace App\Http\Controllers;

use App\Models\Tiketi;
use App\Models\Klienti;
use App\Models\PergjigjaTiketi;
use Illuminate\Http\Request;

class PergjigjaTiketiController extends Controller
{
    public function index()
    {
        $pergjigjet = PergjigjaTiketi::with('tiketi')->get();
        return view('PergjigjaTiketi.index', compact('pergjigjet'));
    }

    public function create()
    {
        $klientet = Klienti::all();
        return view('PergjigjaTiketi.create', compact('klientet'));
    }

    public function store(Request $request)
    {
        $request->validate([
            //'klienti_id' => 'required',
            'autori'    => 'required|string|max:100',
            'mesazhi' => 'required|string',
            'pergjigja' => 'required',
            'bashkengjitja'  => 'nullable|string',
        ]);

        PergjigjaTiketi::create([
            'tiketi_id' => $request->tiketi_id,
            'autori' => $request->autori,
            'mesazhi' => $request->mesazhi,
            'pergjigja' => $request->pergjigja,
            'bashkengjitja' => $request->bashkengjitja,
        ]);

        return redirect('/tiketa/' . $request->tiketi_id)->with('success', 'Pergjigja u shtua me sukses!');
    }

    public function show(PergjigjaTiketi $pergjigjaTiketi)
    {
        return view('PergjigjaTiketi.show', compact('pergjigjaTiketi'));
    }

    public function edit(PergjigjaTiketi $pergjigjaTiketi)
    {
        $klientet = Klienti::all();
        return view('PergjigjaTiketi.edit', compact('pergjigjaTiketi', 'klientet'));
    }

    public function update(Request $request, PergjigjaTiketi $pergjigjaTiketi)
    {
        $request->validate([
            'tiketi_id'     => 'required|exists:tiketis,id',
            'autori'    => 'required|string|max:255',
            'mesazhi' => 'required|string',
            'pergjigja' => 'required',
            'statusi'    => 'required',
            'kategoria'  => 'required|string',
        ]);

        $pergjigjaTiketi->update([
            'autori'    => $request->autori,
            'mesazhi' => $request->mesazhi,
            'pergjigja' => $request->pergjigja,
            'statusi'    => $request->statusi,
            //'kategoria'  => $request->kategoria,
        ]);

        return redirect('/tiketa/' . $request->tiketi_id)->with('success', 'Pergjigja u shtua me sukses!');
    }

   public function destroy(PergjigjaTiketi $pergjigjaTiketi)
{
    $tiketi_id = $pergjigjaTiketi->tiketi_id;

    if ($pergjigjaTiketi->bashkengjitja) {
        \Storage::disk('public')->delete($pergjigjaTiketi->bashkengjitja);
    }

    $pergjigjaTiketi->delete();

    return redirect('/tiketa/' . $tiketi_id)->with('success', 'Pergjigja u fshi me sukses!');
}
}