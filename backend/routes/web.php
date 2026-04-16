<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\KlientController;
use App\Http\Controllers\AbonimiController;
use App\Http\Controllers\PaketaController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\LlogariHostingController;
use App\Http\Controllers\MonitorimServerController;

$web_title = "Hosting Site";

Route::get('/', function () use ($web_title) {
    return view('welcome', ['title' => $web_title]);
});
Route::get('/test', function () use ($web_title) {
    return view('test', ['title' => $web_title]);
});


Route::get('/klienti', [KlientController::class, 'index']);  // Lexo krejt klientet
Route::post('/klienti', [KlientController::class, 'store']); // Krijo klient

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

Route::get('/abonimi', [AbonimiController::class, 'index']);  // Lexo krejt klientet
Route::post('/abonimi', [AbonimiController::class, 'store']); // Krijo klient

Route::get('/paketa', [PaketaController::class, 'index']);  // Lexo krejt klientet
Route::post('/paketa', [PaketaController::class, 'store']); // Krijo klient