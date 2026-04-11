<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\KlientController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AbonimiController;
use App\Http\Controllers\PaketaController;

$web_title = "Hosting Site";

Route::get('/', function () use ($web_title) {
    return view('welcome', ['title' => $web_title]);
});
Route::get('/test', function () use ($web_title) {
    return view('test', ['title' => $web_title]);
});

// Route::get('/klienti', [KlientController::class, 'index']);           // Lexo krejt klientet - Get
// Route::get('/klienti/{id}', [KlientController::class, 'show']);       // Lexo nje klient     - Get
// Route::post('/klienti', [KlientController::class, 'store']);          // Krijo klient        - Create
// Route::put('/klienti/{id}', [KlientController::class, 'update']);     // Perditso nje klient - Update
// Route::delete('/klienti/{id}', [KlientController::class, 'destroy']); // Fshij nje klient    - Delete

// // Authentikimi i perdoruesit
// Route::post('/register', [AuthController::class, 'register']); 
// Route::post('/login', [AuthController::class, 'login']);      

// Route::middleware('auth:sanctum')->group(function () { // Kto linka jan te mbrojtura( duhet token)
//     Route::post('/logout', [AuthController::class, 'logout']);
//     Route::get('/user', [AuthController::class, 'user']);
// });

// Route::get('/abonimi', [AbonimiController::class, 'index']);           // Lexo krejt abonimet - Get
// Route::get('/abonimi/{id}', [AbonimiController::class, 'show']);       // Merr nje abonim     - Get
// Route::post('/abonimi', [AbonimiController::class, 'store']);          // Krijo Abonim        - Create
// Route::put('/abonimi/{id}', [AbonimiController::class, 'update']);     // Perditso nje Abonim - Update
// Route::delete('/abonimi/{id}', [AbonimiController::class, 'destroy']); // Fshij nje Abonim    - Delete

// Route::get('/paketa', [PaketaController::class, 'index']);           // Kthe krejt paketat
// Route::get('/paketa/{id}', [PaketaController::class, 'show']);       // Kthe nje pakete ne baze te id-s
// Route::post('/paketa', [PaketaController::class, 'store']);          // Krijo pakete
// Route::put('/paketa/{id}', [PaketaController::class, 'update']);     // Perditso nje pakete
// Route::delete('/paketa/{id}', [PaketaController::class, 'destroy']); // Fshij nje pakete