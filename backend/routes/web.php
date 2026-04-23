<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FakturaController;
use App\Http\Controllers\TiketiController;
use App\Http\Controllers\PergjigjaTiketiController;

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

Route::get('/tiketa', [TiketiController::class, 'index']);
Route::get('/tiketa/create', [TiketiController::class, 'create']);
Route::post('/tiketa', [TiketiController::class, 'store']);
Route::get('/tiketa/{tiketi}', [TiketiController::class, 'show']);
Route::get('/tiketa/{tiketi}/edit', [TiketiController::class, 'edit']);
Route::put('/tiketa/{tiketi}', [TiketiController::class, 'update']);
Route::delete('/tiketa/{tiketi}', [TiketiController::class, 'destroy']);

Route::post('/pergjigja_tiketi', [PergjigjaTiketiController::class, 'store']);
Route::get('/pergjigja_tiketi/{pergjigjaTiketi}', [PergjigjaTiketiController::class, 'show']);
Route::get('/pergjigja_tiketi/{pergjigjaTiketi}/edit', [PergjigjaTiketiController::class, 'edit']);
Route::put('/pergjigja_tiketi/{pergjigjaTiketi}', [PergjigjaTiketiController::class, 'update']);
Route::delete('/pergjigja_tiketi/{pergjigjaTiketi}', [PergjigjaTiketiController::class, 'destroy']);
