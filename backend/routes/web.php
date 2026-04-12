<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\KlientController;
use App\Http\Controllers\AbonimiController;
use App\Http\Controllers\PaketaController;
use App\Http\Controllers\ServerController;

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

Route::get('/abonimi', [AbonimiController::class, 'index']);  // Lexo krejt klientet
Route::post('/abonimi', [AbonimiController::class, 'store']); // Krijo klient

Route::get('/paketa', [PaketaController::class, 'index']);  // Lexo krejt klientet
Route::post('/paketa', [PaketaController::class, 'store']); // Krijo klient