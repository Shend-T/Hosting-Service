<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\KlientController;
use App\Http\Controllers\AbonimiController;
use App\Http\Controllers\PaketaController;
use App\Http\Controllers\TiketiController;
use App\Http\Controllers\PergjigjaTiketiController;
use App\Http\Controllers\FakturaController;

$web_title = "Hosting Site";

Route::get('/', function () use ($web_title) {
    return view('welcome', ['title' => $web_title]);
});
Route::get('/test', function () use ($web_title) {
    return view('test', ['title' => $web_title]);
});

Route::get('/klienti', [KlientController::class, 'index']);           // Lexo krejt klientet - Get
Route::get('/klienti/{id}', [KlientController::class, 'show']);       // Lexo nje klient     - Get
Route::post('/klienti', [KlientController::class, 'store']);          // Krijo klient        - Create
Route::put('/klienti/{id}', [KlientController::class, 'update']);     // Perditso nje klient - Update
Route::delete('/klienti/{id}', [KlientController::class, 'destroy']); // Fshij nje klient    - Delete

Route::get('/abonimi', [AbonimiController::class, 'index']);           // Lexo krejt abonimet - Get
Route::get('/abonimi/{id}', [AbonimiController::class, 'show']);       // Merr nje abonim     - Get
Route::post('/abonimi', [AbonimiController::class, 'store']);          // Krijo Abonim        - Create
Route::put('/abonimi/{id}', [AbonimiController::class, 'update']);     // Perditso nje Abonim - Update
Route::delete('/abonimi/{id}', [AbonimiController::class, 'destroy']); // Fshij nje Abonim    - Delete

Route::get('/paketa', [PaketaController::class, 'index']);           // Kthe krejt paketat
Route::get('/paketa/{id}', [PaketaController::class, 'show']);       // Kthe nje pakete ne baze te id-s
Route::post('/paketa', [PaketaController::class, 'store']);          // Krijo pakete
Route::put('/paketa/{id}', [PaketaController::class, 'update']);     // Perditso nje pakete
Route::delete('/paketa/{id}', [PaketaController::class, 'destroy']); // Fshij nje pakete

Route::get('/tiketa', [TiketiController::class, 'index']);   // Shfaq te gjitha tiketat
Route::get('/tiketa/create', [TiketiController::class, 'create']); // Shfaq formen
Route::post('/tiketa', [TiketiController::class, 'store']);  // Ruaj tiketen
Route::get('/tiketa/{tiketi}', [TiketiController::class, 'show']); // Shfaq nje tiket
Route::get('/tiketa/{tiketi}/edit', [TiketiController::class, 'edit']); // Shfaq formen e editimit
Route::put('/tiketa/{tiketi}', [TiketiController::class, 'update']); // Update tiketen
Route::delete('/tiketa/{tiketi}', [TiketiController::class, 'destroy']); // Fshi tiketen

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