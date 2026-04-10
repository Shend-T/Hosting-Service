<?php

namespace App\Http\Controllers;

use App\Models\Tiketi;
use App\Models\Klienti;
use Illuminate\Http\Request;

class TiketiController extends Controller
{
    public function index()
    {
        $tiketa = Tiketi::with('klienti')->get();
        return view('tiketa.index', compact('tiketa'));
    }

    public function create()
    {
        $klientet = Klienti::all();
        return view('tiketa.create', compact('klientet'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'klienti_id' => 'required',
            'titulli'    => 'required|string|max:255',
            'pershkrimi' => 'required|string',
            'prioriteti' => 'required',
            'kategoria'  => 'required|string',
        ]);

        Tiketi::create([
            'klienti_id'  => $request->klienti_id,
            'llogaria_id' => $request->llogaria_id,
            'titulli'     => $request->titulli,
            'pershkrimi'  => $request->pershkrimi,
            'prioriteti'  => $request->prioriteti,
            'statusi'     => 'hapur',
            'data_hapjes' => now(),
            'kategoria'   => $request->kategoria,
        ]);

        return redirect('/tiketa')->with('success', 'Tiketi u krijua me sukses!');
    }

    public function show(Tiketi $tiketi)
    {
        return view('tiketa.show', compact('tiketi'));
    }

    public function edit(Tiketi $tiketi)
    {
        $klientet = Klienti::all();
        return view('tiketa.edit', compact('tiketi', 'klientet'));
    }

    public function update(Request $request, Tiketi $tiketi)
    {
        $request->validate([
            'titulli'    => 'required|string|max:255',
            'pershkrimi' => 'required|string',
            'prioriteti' => 'required',
            'statusi'    => 'required',
            'kategoria'  => 'required|string',
        ]);

        $tiketi->update([
            'titulli'    => $request->titulli,
            'pershkrimi' => $request->pershkrimi,
            'prioriteti' => $request->prioriteti,
            'statusi'    => $request->statusi,
            'kategoria'  => $request->kategoria,
        ]);

        return redirect('/tiketa')->with('success', 'Tiketi u perditesua me sukses!');
    }

    public function destroy(Tiketi $tiketi)
    {
        $tiketi->delete();
        return redirect('/tiketa')->with('success', 'Tiketi u fshi me sukses!');
    }
}