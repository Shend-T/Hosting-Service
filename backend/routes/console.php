<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('pershendetje', function() {
    $this->comment("Pershendetje nga zemra!");
})->purpose("Pershendetje Profesorit");