<?php

namespace App\Http\Controllers;

use App\Models\Servers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ServerController extends Controller
{
    // Listo cdo server (Read)
    public function index()
    {
        $servers = Servers::all();         // merr krejt rreshtat
        return response()->json($servers); // kthen JSON
    }

    // Krijo server te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'emri'             => 'required|string|max:255',
            'ip_adresa'        => 'required|ip|unique:servers,ip_adresa',
            'lloji'            => 'sometimes|in:web,mail',
            'sistemi_operativ' => 'sometimes|in:ubuntu,debian,rhel',
            'ram_gb'           => 'required|integer|min:0',
            'cpu_core'         => 'required|integer|min:0',
            'hapesira_tb'      => 'required|integer|min:1',
            'lokacioni'        => 'required|string|max:255',
            'statusi'          => 'sometimes|in:aktiv,jo-aktiv',
        ]);

        $server = Servers::create($data);

        return response()->json($server, 201); // Status 201 = Krijuar
    }

    // Lexo nje server (Read one)
    public function show(Servers $server)
    {
        return response()->json($server);
    }

    // Përditëso server (Update)
    // public function update(Request $request, Servers $server)
    // {
        // $data = $request->validate([
        //     'emri'       => 'sometimes|required|string|max:255',
        //     'ip_address' => [
        //         'sometimes',
        //         'required',
        //         'ip',
        //         Rule::unique('servers', 'ip_address')->ignore($server->id),
        //     ],
        //     'statusi'    => 'nullable|in:aktiv,jo-aktiv,suspenduar',
        //     'ram_gb'     => 'sometimes|required|integer|min:0',
        //     'disk_gb'    => 'sometimes|required|integer|min:0',
        //     'lokacioni'  => 'sometimes|required|string|max:255',
        // ]);

        // $server->update($data);

        // return response()->json($server);
    // }

    // Fshi server (Delete)
    public function destroy(Servers $server)
    {
        $server->delete();

        return response()->json(null, 204);
    }
}
