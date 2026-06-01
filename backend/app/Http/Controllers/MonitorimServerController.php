<?php

namespace App\Http\Controllers;

use App\Models\MonitorimServer;
use Illuminate\Http\Request;

class MonitorimServerController extends Controller
{
    // Listo cdo monitorim server (Read)
    public function index()
    {
        $monitorimServers = MonitorimServer::all(); // merr krejt rreshtat
        return response()->json($monitorimServers); // kthen JSON
    }

    // Lexo nje monitorim server (Read one)
    public function show(MonitorimServer $monitorimServer)
    {
        return response()->json($monitorimServer);
    }

    // Krijo monitorim server te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'serveri_id'    => 'required|exists:servers,id',
            'cpu_perdorim'  => 'required|numeric|min:0',
            'ram_perdorim'  => 'required|numeric|min:0',
            'disk_perdorim' => 'required|numeric|min:0',
            'bandwidth'     => 'required|numeric|min:0',
            'statusi'       => 'sometimes|in:monitoron,nuk-monitoron',
            'alarmi'        => 'sometiemes|boolean',
        ]);

        $monitorimServer = MonitorimServer::create($data);

        return response()->json($monitorimServer, 201); // Status 201 = Krijuar
    }

    // Përditëso monitorim server (Update)
    public function update(Request $request, MonitorimServer $monitorimServer)
    {
        $data = $request->validate([
            'serveri_id'    => 'sometimes|exists:servers,id',
            'cpu_perdorim'  => 'sometimes|numeric|min:0',
            'ram_perdorim'  => 'sometimes|numeric|min:0',
            'disk_perdorim' => 'sometimes|numeric|min:0',
            'bandwidth'     => 'sometimes|numeric|min:0',
            'statusi'       => 'sometimes|in:monitoron,nuk-monitoron',
            // 'statusi'       => 'sometimes|in:normal,warning,kritik',
            'alarmi'        => 'sometiemes|boolean',
        ]);

        $monitorimServer->update($data);

        return response()->json($monitorimServer);
    }

    // Fshi monitorim server (Delete)
    public function destroy(MonitorimServer $monitorimServer)
    {
        $monitorimServer->delete();

        return response()->json(null, 204);
    }
}

