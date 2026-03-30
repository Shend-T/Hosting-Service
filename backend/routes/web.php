<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\KlientController;
use App\Http\Controllers\AbonimiController;
use App\Http\Controllers\PaketaController;

$web_title = "Hosting Site";

Route::get('/', function () use ($web_title) {
    return view('welcome', ['title' => $web_title]);
});
Route::get('/test', function () use ($web_title) {
    return view('test', ['title' => $web_title]);
});


Route::get('/klienti', [KlientController::class, 'index']);  // Lexo krejt klientet
Route::post('/klienti', [KlientController::class, 'store']); // Krijo klient
Route::get('/klienti/{id}', [KlientController::class, 'show']); // Lexo nje klient
Route::put('/klienti/{id}', [KlientController::class, 'update']); // Perditso nje klient
Route::delete('/klienti/{id}', [KlientController::class, 'destroy']); 

Route::get('/abonimi', [AbonimiController::class, 'index']);  // Lexo krejt abonimet
Route::post('/abonimi', [AbonimiController::class, 'store']); // Krijo abonim

Route::get('/paketa', [PaketaController::class, 'index']);  // Lexo krejt paketat
Route::post('/paketa', [PaketaController::class, 'store']); // Krijo pakete