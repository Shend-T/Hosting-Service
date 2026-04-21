<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use App\Models\LlogariHostings;
use Illuminate\Http\Request;

class DomainController extends Controller
{
    // Listo cdo domain (Read)
    public function index()
    {
        $domains = Domain::all();          // merr krejt rreshtat
        return response()->json($domains); // kthen JSON
    }

    // Lexo nje domain (Read one)
    public function show(Domain $domain)
    {
        return response()->json($domain);
    }

    // Krijo domain te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'klienti_id'          => 'required|exists:klienti,id',
            'llogari_hostings_id' => 'required|exists:llogari_hostings,id',
            'emri_domainit'       => 'required|string|max:255',
            'tld'                 => 'sometimes|string|max:4',
            'nameserverat'        => 'sometimes|string|max:255',
            'statusi'             => 'sometimes|in:aktiv,jo-aktiv,suspenduar',
            'data_regjistrimit'   => 'required|date',
            'data_skadimit'       => 'required|date'
        ]);
        $domain = Domain::create($data);

        return response()->json($domain, 201); // Status 201 = Krijuar
    }

    // Përditëso domain (Update)
    public function update(Request $request, Domain $domain)
    {
        $data = $request->validate([
            'emri_domainit'     => 'sometimes|string|max:255',
            'tld'               => 'sometimes|string|max:4',
            'nameserverat'      => 'sometimes|string|max:255',
            'statusi'           => 'sometimes|in:aktiv,jo-aktiv,suspenduar',
            'data_skadimit'     => 'sometimes|date'
        ]);

        $domain->update($data);

        return response()->json($domain);
    }

    // Fshi domain (Delete)
    public function destroy(Request $request, int $id)
    {
        $domain = Domain::where('id', $id)
            ->where('klienti_id', $request->user()->id)
            ->firstOrFail();

        $domain->delete();
    }

    // Kthe domain-at e user-it
    public function userDomains(Request $request)
    {
        $domains = Domain::where('klienti_id', $request->user()->id)
            ->with('llogariHostings')
            ->get();

        return response()->json($domains);
    }
    public function userStore(Request $request)
    {
        $data = $request->validate([
            'llogari_hostings_id' => 'required|exists:llogari_hostings,id',
            'emri_domainit'       => 'required|string|max:255|unique:domains,emri_domainit',
            'tld'                 => 'sometimes|string|max:4',
            'data_skadimit'       => 'required|date|after:today',
        ]);

        // Make sure the hosting account belongs to this user
        $llogariHostings = LlogariHostings::whereHas('abonimi', function ($query) use ($request) {
            $query->where('klienti_id', $request->user()->id);
        })->findOrFail($data['llogari_hostings_id']);

        $domain = Domain::create([
            'klienti_id'          => $request->user()->id,
            'llogari_hostings_id' => $data['llogari_hostings_id'],
            'emri_domainit'       => $data['emri_domainit'],
            'tld'                 => $data['tld'] ?? '.ubt',
            'data_regjistrimit'   => now(),
            'data_skadimit'       => $data['data_skadimit'],
            'statusi'             => 'aktiv',
        ]);

        return response()->json($domain->load('llogariHostings'), 201);
    }
}

