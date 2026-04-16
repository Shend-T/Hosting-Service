<?php

namespace App\Http\Controllers;

use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ServerController extends Controller
{
    // Listo cdo server (Read)
    public function index()
    {
        $servers = Server::all();         // merr krejt rreshtat
        return response()->json($servers); // kthen JSON
    }

    // Krijo server te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'emri'       => 'required|string|max:255',
            'ip_address' => 'required|ip|unique:servers,ip_address',
            'statusi'    => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'ram_gb'     => 'required|integer|min:0',
            'disk_gb'    => 'required|integer|min:0',
            'lokacioni'  => 'required|string|max:255',
        ]);

        $server = Server::create($data);

        return response()->json($server, 201); // Status 201 = Krijuar
    }

    // Lexo nje server (Read one)
    public function show(Server $server)
    {
        return response()->json($server);
    }

    // Përditëso server (Update)
    public function update(Request $request, Server $server)
    {
        $data = $request->validate([
            'emri'       => 'sometimes|required|string|max:255',
            'ip_address' => [
                'sometimes',
                'required',
                'ip',
                Rule::unique('servers', 'ip_address')->ignore($server->id),
            ],
            'statusi'    => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'ram_gb'     => 'sometimes|required|integer|min:0',
            'disk_gb'    => 'sometimes|required|integer|min:0',
            'lokacioni'  => 'sometimes|required|string|max:255',
        ]);

        $server->update($data);

        return response()->json($server);
    }

    // Fshi server (Delete)
    public function destroy(Server $server)
    {
        $server->delete();

        return response()->json(null, 204);
    }
}
