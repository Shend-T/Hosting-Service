<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FakturaController;

$web_title = "Hosting Site";

Route::get('/', function () use ($web_title) {
    return view('welcome', ['title' => $web_title]);
});
Route::get('/test', function () use ($web_title) {
    return view('test', ['title' => $web_title]);
});

Route::get('/faturat', [FakturaController::class, 'index']);
Route::get('/faturat/{id}', [FakturaController::class, 'show']);
Route::post('/faturat', [FakturaController::class, 'store']);
Route::put('/faturat/{id}', [FakturaController::class, 'update']);
Route::delete('/faturat/{id}', [FakturaController::class, 'destroy']);
