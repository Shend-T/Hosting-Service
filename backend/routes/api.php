<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\KlientController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AbonimiController;
use App\Http\Controllers\PaketaController;
use App\Http\Controllers\TiketiController;
use App\Http\Controllers\PergjigjaTiketiController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\LlogariHostingController;
use App\Http\Controllers\MonitorimServerController;

Route::get('/klienti', [KlientController::class, 'index']);           // Lexo krejt klientet - Get
Route::get('/klienti/{id}', [KlientController::class, 'show']);       // Lexo nje klient     - Get
Route::post('/klienti', [KlientController::class, 'store']);          // Krijo klient        - Create
Route::put('/klienti/{id}', [KlientController::class, 'update']);     // Perditso nje klient - Update
Route::delete('/klienti/{id}', [KlientController::class, 'destroy']); // Fshij nje klient    - Delete

// Authentikimi i perdoruesit
Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']);    

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/abonimi/chart', [AbonimiController::class, 'chartData']);
    Route::post('/abonimi/user', [AbonimiController::class, 'userStore']);

    Route::patch('/klienti/add-funds', [KlientController::class, 'addFunds']); 
    Route::patch('/klienti/remove-funds', [KlientController::class, 'removeFunds']); 

    Route::get('/tickets', [TiketiController::class, 'index']);
    Route::post('/tickets', [TiketiController::class, 'store']);
    Route::delete('/tickets/{ticket}', [TiketiController::class, 'destroy']);

    Route::post('/tickets/{ticket}/answers', [PergjigjaTiketiController::class, 'store']);
    Route::delete('/tickets/{ticket}/answers/{answer}', [PergjigjaTiketiController::class, 'destroy']);
});

Route::get('/servers', [ServerController::class, 'index']);
Route::post('/servers', [ServerController::class, 'store']);
Route::get('/servers/{server}', [ServerController::class, 'show']);
Route::put('/servers/{server}', [ServerController::class, 'update']);
Route::patch('/servers/{server}', [ServerController::class, 'update']);
Route::delete('/servers/{server}', [ServerController::class, 'destroy']);

Route::get('/domains', [DomainController::class, 'index']);
Route::post('/domains', [DomainController::class, 'store']);
Route::get('/domains/{domain}', [DomainController::class, 'show']);
Route::put('/domains/{domain}', [DomainController::class, 'update']);
Route::patch('/domains/{domain}', [DomainController::class, 'update']);
Route::delete('/domains/{domain}', [DomainController::class, 'destroy']);

Route::get('/llogari-hostings', [LlogariHostingController::class, 'index']);
Route::post('/llogari-hostings', [LlogariHostingController::class, 'store']);
Route::get('/llogari-hostings/{llogariHosting}', [LlogariHostingController::class, 'show']);
Route::put('/llogari-hostings/{llogariHosting}', [LlogariHostingController::class, 'update']);
Route::patch('/llogari-hostings/{llogariHosting}', [LlogariHostingController::class, 'update']);
Route::delete('/llogari-hostings/{llogariHosting}', [LlogariHostingController::class, 'destroy']);

Route::get('/monitorim-servers', [MonitorimServerController::class, 'index']);
Route::post('/monitorim-servers', [MonitorimServerController::class, 'store']);
Route::get('/monitorim-servers/{monitorimServer}', [MonitorimServerController::class, 'show']);
Route::put('/monitorim-servers/{monitorimServer}', [MonitorimServerController::class, 'update']);
Route::patch('/monitorim-servers/{monitorimServer}', [MonitorimServerController::class, 'update']);
Route::delete('/monitorim-servers/{monitorimServer}', [MonitorimServerController::class, 'destroy']);

Route::get('/abonimi', [AbonimiController::class, 'index']);
Route::get('/abonimi/{id}', [AbonimiController::class, 'show']);
Route::post('/abonimi', [AbonimiController::class, 'store']);
Route::put('/abonimi/{id}', [AbonimiController::class, 'update']);
Route::delete('/abonimi/{id}', [AbonimiController::class, 'destroy']);

Route::get('/paketa', [PaketaController::class, 'index']);
Route::get('/paketa/{id}', [PaketaController::class, 'show']);
Route::get('/paketa-3', [PaketaController::class, 'showFirstThree']);
Route::post('/paketa', [PaketaController::class, 'store']);
Route::put('/paketa/{id}', [PaketaController::class, 'update']);
Route::delete('/paketa/{id}', [PaketaController::class, 'destroy']);