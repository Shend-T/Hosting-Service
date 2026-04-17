<?php

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
use App\Http\Controllers\FakturaController;

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

Route::post('/pergjigja_tiketi', [PergjigjaTiketiController::class, 'store']);  // Ruaj pergjigjen e tiketis
Route::get('/pergjigja_tiketi/{pergjigjaTiketi}' , [PergjigjaTiketiController::class, 'show']);      // Shfaq nje pergjigje te tiketis
Route::get('/pergjigja_tiketi/{pergjigjaTiketi}/edit', [PergjigjaTiketiController::class, 'edit']); // Shfaq formen e editimit te pergjigjes se tiketis
Route::put('/pergjigja_tiketi/{pergjigjaTiketi}', [PergjigjaTiketiController::class, 'update']); // Update pergjigjen e tiketis
Route::delete('/pergjigja_tiketi/{pergjigjaTiketi}', [PergjigjaTiketiController::class, 'destroy']); // Fshi pergjigjen e tiket

Route::get('/faturat', [FakturaController::class, 'index']);
Route::get('/faturat/{id}', [FakturaController::class, 'show']);
Route::post('/faturat', [FakturaController::class, 'store']);
Route::put('/faturat/{id}', [FakturaController::class, 'update']);
Route::delete('/faturat/{id}', [FakturaController::class, 'destroy']);
