<?php

namespace App\Http\Controllers;

use App\Models\Servers;
use App\Models\LlogariHostings;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ServerController extends Controller
{
    // Listo cdo server (Read)
    public function index()
    {
        // $servers = Servers::all();         // merr krejt rreshtat
        // return response()->json($servers); // kthen JSON

        $servers = Servers::withSum('llogariHostings', 'hapesira_perdorur')
        ->get()
        ->map(function ($server) {
            $totalStorageGb = $server->hapesira_tb * 1024;
            $usedStorageGb  = $server->llogari_hostings_sum_hapesira_perdorur ?? 0;
            $freeStorageGb  = $totalStorageGb - $usedStorageGb;

            return [
                'id'               => $server->id,
                'emri'             => $server->emri,
                'ip_adresa'        => $server->ip_adresa,
                'lloji'            => $server->lloji,
                'sistemi_operativ' => $server->sistemi_operativ,
                'ram_gb'           => $server->ram_gb,
                'cpu_core'         => $server->cpu_core,
                'hapesira_tb'      => $server->hapesira_tb,
                'lokacioni'        => $server->lokacioni,
                'statusi'          => $server->statusi,
                'data_instalimit'  => $server->data_instalimit,

                'hapesira_gb' => $totalStorageGb,
                'hapesira_perdorur_gb'  => $usedStorageGb,
                'hapesira_paperdorur_gb'  => $freeStorageGb,
                'hapesira_paperdorur_perqindje'  => $totalStorageGb > 0
                    ? round(($usedStorageGb / $totalStorageGb) * 100, 2)
                    : 0,
            ];
        });

        return response()->json($servers);
    }
    
    // Lexo nje server (Read one)
    public function show(Servers $server)
    {
        $server->loadSum('llogariHostings', 'hapesira_perdorur');

        $totalStorageGb = $server->hapesira_tb * 1024;
        $usedStorageGb  = $server->llogari_hostings_sum_hapesira_perdorur ?? 0;
        $freeStorageGb  = $totalStorageGb - $usedStorageGb;

        return response()->json([
            ...$server->toArray(),
            'hapesira_gb' => $totalStorageGb,
            'hapesira_perdorur_gb'  => $usedStorageGb,
            'hapesira_paperdorur_gb'  => $freeStorageGb,
            'hapesira_paperdorur_perqindje'  => $totalStorageGb > 0
                ? round(($usedStorageGb / $totalStorageGb) * 100, 2)
                : 0,
        ]);
    }
    
    // Krijo server te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'emri'             => 'required|string|max:255',
            'ip_adresa'        => 'required|ip|unique:servers,ip_adresa',
            'lloji'            => 'sometimes|in:web,mail',
            'sistemi_operativ' => 'sometimes|in:ubuntu,debian,rhel',
            'ram_gb'           => 'required|integer|min:1',
            'cpu_core'         => 'required|integer|min:1',
            'hapesira_tb'      => 'required|numeric|min:0.5',
            'lokacioni'        => 'required|string|max:255',
            'statusi'          => 'sometimes|in:aktiv,jo-aktiv',
            'data_instalimit'  => 'required|date'
        ]);

        $server = Servers::create($data);

        return response()->json($server, 201); // Status 201 = Krijuar
    }

    

    // Përditëso server (Update)
    public function update(Request $request, Servers $server)
    {
        $data = $request->validate([
            'emri'             => 'required|string|max:255',
            'ip_adresa'        => 'required|ip|unique:servers,ip_adresa',
            'lloji'            => 'sometimes|in:web,mail',
            'sistemi_operativ' => 'sometimes|in:ubuntu,debian,rhel',
            'ram_gb'           => 'required|integer|min:1',
            'cpu_core'         => 'required|integer|min:1',
            'hapesira_tb'      => 'required|numeric|min:0.5',
            'lokacioni'        => 'required|string|max:255',
            'statusi'          => 'sometimes|in:aktiv,jo-aktiv',
        ]);

        $server->update($data);

        return response()->json($server);
    }

    // Fshi server (Delete)
    public function destroy(Servers $server)
    {
        $server->delete();

        return response()->json(null, 204);
    }
}
