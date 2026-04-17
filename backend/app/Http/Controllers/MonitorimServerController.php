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

    // Krijo monitorim server te ri (Create)
    public function store(Request $request)
    {
        $data = $request->validate([
            'server_id' => 'required|exists:servers,id',
            'cpu_usage' => 'required|numeric|min:0',
            'ram_usage' => 'required|numeric|min:0',
            'disk_usage' => 'required|numeric|min:0',
            'statusi' => 'nullable|in:normal,warning,kritik',
            'checked_at' => 'required|date',
        ]);

        $monitorimServer = MonitorimServer::create($data);

        return response()->json($monitorimServer, 201); // Status 201 = Krijuar
    }

    // Lexo nje monitorim server (Read one)
    public function show(MonitorimServer $monitorimServer)
    {
        return response()->json($monitorimServer);
    }

    // Përditëso monitorim server (Update)
    public function update(Request $request, MonitorimServer $monitorimServer)
    {
        $data = $request->validate([
            'server_id' => 'sometimes|required|exists:servers,id',
            'cpu_usage' => 'sometimes|required|numeric|min:0',
            'ram_usage' => 'sometimes|required|numeric|min:0',
            'disk_usage' => 'sometimes|required|numeric|min:0',
            'statusi' => 'nullable|in:normal,warning,kritik',
            'checked_at' => 'sometimes|required|date',
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

