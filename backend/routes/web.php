<?php

use Illuminate\Support\Facades\Route;

$web_title = "Hosting Site";

Route::get('/', function () use ($web_title) {
    return view('welcome', ['title' => $web_title]);
});
Route::get('/test', function () use ($web_title) {
    return view('test', ['title' => $web_title]);
});