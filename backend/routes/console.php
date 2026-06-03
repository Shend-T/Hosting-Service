<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

use Illuminate\Support\Facades\Schedule;
use App\Console\Commands\CheckAbonimiSkaduar;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('pershendetje', function() {
    $this->comment("Pershendetje nga zemra!");
})->purpose("Pershendetje Profesorit");


Schedule::command(CheckAbonimiSkaduar::class)->everyFiveMinutes(); // normalisht everyHour()