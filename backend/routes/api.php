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

Route::middleware('auth:sanctum')->group(function () { // Kto linka jan te mbrojtura( duhet token)
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/abonimi/chart', [AbonimiController::class, 'chartData']);
    Route::get('/abonimi/user', [AbonimiController::class, 'userAbonimi']);
    Route::post('/abonimi/user', [AbonimiController::class, 'userStore']);
    Route::patch('/abonimi/{id}/toggle-auto-rinovim', [AbonimiController::class, 'toggleAutoRinovim']);
    Route::patch('/abonimi/{id}/cancel', [AbonimiController::class, 'cancelAbonimi']);
    Route::patch('/abonimi/{id}/activate', [AbonimiController::class, 'activateAbonimi']);

    Route::patch('/klienti/add-funds', [KlientController::class, 'addFunds']); 
    Route::patch('/klienti/remove-funds', [KlientController::class, 'removeFunds']); 
});

Route::get('/servers', [ServerController::class, 'index']);  // Lexo krejt serverat
Route::post('/servers', [ServerController::class, 'store']); // Krijo server
Route::get('/servers/{server}', [ServerController::class, 'show']); // Lexo nje server
Route::put('/servers/{server}', [ServerController::class, 'update']); // Përditëso server
Route::patch('/servers/{server}', [ServerController::class, 'update']); // Përditëso server
Route::delete('/servers/{server}', [ServerController::class, 'destroy']); // Fshi server

Route::get('/domains', [DomainController::class, 'index']);  // Lexo te gjitha domainet
Route::post('/domains', [DomainController::class, 'store']); // Krijo domain
Route::get('/domains/{domain}', [DomainController::class, 'show']); // Lexo nje domain
Route::put('/domains/{domain}', [DomainController::class, 'update']); // Përditëso domain
Route::patch('/domains/{domain}', [DomainController::class, 'update']); // Përditëso domain
Route::delete('/domains/{domain}', [DomainController::class, 'destroy']); // Fshi domain

Route::get('/llogari-hostings', [LlogariHostingController::class, 'index']);  // Lexo te gjitha llogari hosting
Route::post('/llogari-hostings', [LlogariHostingController::class, 'store']); // Krijo llogari hosting
Route::get('/llogari-hostings/{llogariHosting}', [LlogariHostingController::class, 'show']); // Lexo nje llogari hosting
Route::put('/llogari-hostings/{llogariHosting}', [LlogariHostingController::class, 'update']); // Përditëso llogari hosting
Route::patch('/llogari-hostings/{llogariHosting}', [LlogariHostingController::class, 'update']); // Përditëso llogari hosting
Route::delete('/llogari-hostings/{llogariHosting}', [LlogariHostingController::class, 'destroy']); // Fshi llogari hosting

Route::get('/monitorim-servers', [MonitorimServerController::class, 'index']);  // Lexo te gjitha monitorimet
Route::post('/monitorim-servers', [MonitorimServerController::class, 'store']); // Krijo monitorim
Route::get('/monitorim-servers/{monitorimServer}', [MonitorimServerController::class, 'show']); // Lexo nje monitorim
Route::put('/monitorim-servers/{monitorimServer}', [MonitorimServerController::class, 'update']); // Përditëso monitorim
Route::patch('/monitorim-servers/{monitorimServer}', [MonitorimServerController::class, 'update']); // Përditëso monitorim
Route::delete('/monitorim-servers/{monitorimServer}', [MonitorimServerController::class, 'destroy']); // Fshi monitorim

Route::get('/abonimi', [AbonimiController::class, 'index']);           // Lexo krejt abonimet - Get
Route::get('/abonimi/{id}', [AbonimiController::class, 'show']);       // Merr nje abonim     - Get
Route::post('/abonimi', [AbonimiController::class, 'store']);          // Krijo Abonim        - Create
Route::put('/abonimi/{id}', [AbonimiController::class, 'update']);     // Perditso nje Abonim - Update
Route::delete('/abonimi/{id}', [AbonimiController::class, 'destroy']); // Fshij nje Abonim    - Delete

Route::get('/paketa', [PaketaController::class, 'index']);            // Kthe krejt paketat
Route::get('/paketa/{id}', [PaketaController::class, 'show']);        // Kthe nje pakete ne baze te id-s
Route::get('/paketa-3', [PaketaController::class, 'showFirstThree']); // Kthe vetem 3 paketat e para( na duhet per home page)
Route::post('/paketa', [PaketaController::class, 'store']);           // Krijo pakete
Route::put('/paketa/{id}', [PaketaController::class, 'update']);      // Perditso nje pakete
Route::delete('/paketa/{id}', [PaketaController::class, 'destroy']);  // Fshij nje pakete