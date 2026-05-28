<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Klienti;
use App\Models\Paketa;
use App\Models\Abonimi;

use App\Models\MonitorimServer;

use App\Models\Tiketi;
use App\Models\PergjigjaTiketi;
use App\Models\Faktura;

class AdminController extends Controller
{
    // ========== Klienti ==========
    public function getAllKlienti(Request $request) 
    {
        $klienti = Klienti::all();
        return response()->json($klienti, 200);
    }

    public function getKlienti(Request $request, int $id) {
        $klienti = Klienti::findOrFail($id);
        return response()->json($klienti, 200);
    }

    public function createKlienti(Request $request) {
        $data = $request->validate([
            'emri'      => 'required|string|max:255',
            'mbiemri'   => 'required|string|max:255',
            'kompania'  => 'required|string|max:255',
            'email'     => 'required|email|unique:klienti,email',
            'password'  => 'required|string|min:8',
            'telefoni'  => 'required|string|max:20',
            'adresa'    => 'required|string|max:255',
            'statusi'   => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'bilanci'   => 'nullable|numeric',
        ]);
        
        $klienti = Klienti::create($data);
        return response()->json($klienti, 201);
    }

    public function updateKlienti(Request $request, int $id) {
        $klienti = Klienti::findOrFail($id);

        $data = $request->validate([
            'emri'      => 'required|string|max:255',
            'mbiemri'   => 'required|string|max:255',
            'kompania'  => 'required|string|max:255',
            'email'     => 'required|email|unique:klienti,email,' . $klienti->id,
            'telefoni'  => 'required|string|max:20',
            'adresa'    => 'required|string|max:255',
            'statusi'   => 'nullable|in:aktiv,jo-aktiv,suspenduar',
            'bilanci'   => 'nullable|numeric',
        ]);

        $klienti->update($data);
        return response()->json($klienti, 200);
    }

    public function deleteKlienti(Request $request, int $id) {
        $klienti = Klienti::findOrFail($id);
        $klienti->delete();
        return response()->json("", 204);
    }

    // ========== Paketa ==========
    public function getAllPaketa(Request $request) {
        $paketat = Paketa::all();
        return response()->json($paketat, 200);
    }

    public function getPaketa(Request $request, int $id) {
        $paketa = Paketa::findOrFail($id);
        return response()->json($paketa, 200);
    }

    public function createPaketa(Request $request) {
        $data = $request->validate([
            'emri'         => 'required|string|max:255',
            'pershkrimi'   => 'nullable|string',
            'hapesira_gb'  => 'required|integer',
            'bandwidth_gb' => 'required|integer',
            'nr_domaineve' => 'required|integer',
            'nr_emaileve'  => 'required|integer',
            'ssl'          => 'sometimes|boolean',
            'cmimi_mujor'  => 'required|numeric',
            'cmimi_vjetor' => 'required|numeric',
            'statusi'      => 'nullable|in:aktiv,jo-aktiv'
        ]);

        $paketa = Paketa::create($data);
        return response()->json($paketa, 201);
    }

    public function updatePaketa(Request $request, int $id) {
        $paketa = Paketa::findOrFail($id);

        $data = $request->validate([
            'emri'         => 'required|string|max:255',
            'pershkrimi'   => 'nullable|string',
            'hapesira_gb'  => 'required|integer',
            'bandwidth_gb' => 'required|integer',
            'nr_domaineve' => 'required|integer',
            'nr_emaileve'  => 'required|integer',
            'ssl'          => 'sometimes|boolean',
            'cmimi_mujor'  => 'required|numeric',
            'cmimi_vjetor' => 'required|numeric',
            'statusi'      => 'nullable|in:aktiv,jo-aktiv'
        ]);

        $paketa->update($data);
        return response()->json($paketa, 200);
    }

    public function deletePaketa(Request $request, int $id) {
        $paketa = Paketa::findOrFail($id);
        $paketa->delete();
        return response()->json("", 204);
    }

    // ========== Abonimi ==========
    public function getAllAbonimi(Request $request) {
        $abonimet = Abonimi::all();
        return response()->json($abonimet, 200);
    }

    public function getAbonimi(Request $request, int $id) {
        $abonimi = Abonimi::findOrFail($id);
        return response()->json($abonimi, 200);
    }

    public function createAbonimi(Request $request) {
        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'paketa_id'     => 'required|exists:paketa,id',
            'data_fillimit' => 'required|date',
            'data_skadimit' => 'required|date|after_or_equal:data_fillimit',
            'statusi'       => 'sometimes|in:pritje,aktiv,suspenduar,skaduar,ndalur',
            'cmimi'         => 'required|numeric',
            'periudha'      => 'required|in:mujore,vjetore',
            'auto_rinovim'  => 'sometimes|boolean'
        ]);

        $abonimi = Abonimi::create($data);
        return response()->json($abonimi, 201);
    }

    public function updateAbonimi(Request $request, int $id) {
        $abonimi = Abonimi::findOrFail($id);

        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'paketa_id'     => 'required|exists:paketa,id',
            'data_fillimit' => 'required|date',
            'data_skadimit' => 'required|date|after_or_equal:data_fillimit',
            'statusi'       => 'sometimes|in:pritje,aktiv,suspenduar,skaduar,ndalur',
            'cmimi'         => 'required|numeric',
            'periudha'      => 'required|in:mujore,vjetore',
            'auto_rinovim'  => 'sometimes|boolean'
        ]);

        $abonimi->update($data);

        return response()->json($abonimi, 200);
    }

    public function deleteAbonimi(Request $request, int $id) {
        $abonimi = Abonimi::findOrFail($id);
        $abonimi->delete();
        return response()->json("", 204);
    }

    // ========== Monitorim Server ==========
    public function getAllMonitorimServer(Request $request) {
        $monitoret = MonitorimServer::all();
        return response()->json($monitoret, 200);
    }

    // ========== Tiketa ==========
    public function getAllTiketa(Request $request) {
        $tiketa = Tiketi::with('klienti')->get();
        return response()->json($tiketa, 200);
    }

    public function getTiketi(Request $request, int $id) {
        $tiketi = Tiketi::with(['klienti', 'pergjigjet'])->findOrFail($id);
        return response()->json($tiketi, 200);
    }

    public function createTiketi(Request $request) {
        $data = $request->validate([
            'klienti_id'  => 'required|exists:klienti,id',
            'titulli'     => 'required|string|max:255',
            'pershkrimi'  => 'required|string',
            'prioriteti'  => 'sometimes|in:i_ulet,normal,i_larte,urgjent',
            'statusi'     => 'sometimes|in:hapur,ne_proces,mbyllur',
            'kategoria'   => 'required|string',
        ]);
        $tiketi = Tiketi::create($data);
        return response()->json($tiketi, 201);
    }

    public function updateTiketi(Request $request, int $id) {
        $tiketi = Tiketi::findOrFail($id);
        $data = $request->validate([
            'titulli'    => 'sometimes|string|max:255',
            'pershkrimi' => 'sometimes|string',
            'prioriteti' => 'sometimes|in:i_ulet,normal,i_larte,urgjent',
            'statusi'    => 'sometimes|in:hapur,ne_proces,mbyllur',
            'kategoria'  => 'sometimes|string',
        ]);
        $tiketi->update($data);
        return response()->json($tiketi, 200);
    }

    public function deleteTiketi(Request $request, int $id) {
        Tiketi::findOrFail($id)->delete();
        return response()->json("", 204);
    }

    // ========== Pergjigjet e Tiketave ==========
    public function getAllPergjigjet(Request $request) {
        $pergjigjet = PergjigjaTiketi::with('tiketi')->get();
        return response()->json($pergjigjet, 200);
    }

    public function createPergjigje(Request $request) {
        $data = $request->validate([
            'tiketi_id' => 'required|exists:tiketis,id',
            'autori'    => 'required|string|max:100',
            'mesazhi'   => 'required|string',
            'pergjigja' => 'required|string',
        ]);
        $pergjigja = PergjigjaTiketi::create($data);
        return response()->json($pergjigja, 201);
    }

    public function deletePergjigje(Request $request, int $id) {
        PergjigjaTiketi::findOrFail($id)->delete();
        return response()->json("", 204);
    }

    // ========== Faturat ==========
    public function getAllFaturat(Request $request) {
        $faturat = Faktura::with('klienti')->get();
        return response()->json($faturat, 200);
    }

    public function getFaktura(Request $request, int $id) {
        $faktura = Faktura::with('klienti')->findOrFail($id);
        return response()->json($faktura, 200);
    }

    public function createFaktura(Request $request) {
        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'abonimi_id'    => 'required|exists:abonimi,id',
            'shuma'         => 'required|numeric|min:0',
            'data_leshimit' => 'sometimes|date',
            'data_skadimit' => 'nullable|date',
            'statusi'       => 'sometimes|in:paguar,papaguar,anuluar',
            'pershkrimi'    => 'nullable|string',
        ]);
        $faktura = Faktura::create($data);
        return response()->json($faktura, 201);
    }

    public function updateFaktura(Request $request, int $id) {
        $faktura = Faktura::findOrFail($id);
        $data = $request->validate([
            'klienti_id'    => 'required|exists:klienti,id',
            'abonimi_id'    => 'required|exists:abonimi,id',
            'shuma'         => 'required|numeric|min:0',
            'data_leshimit' => 'sometimes|date',
            'data_skadimit' => 'nullable|date',
            'statusi'       => 'sometimes|in:paguar,papaguar,anuluar',
            'pershkrimi'    => 'nullable|string',
        ]);
        $faktura->update($data);
        return response()->json($faktura, 200);
    }

    public function deleteFaktura(Request $request, int $id) {
        Faktura::findOrFail($id)->delete();
        return response()->json("", 204);
    }
}
