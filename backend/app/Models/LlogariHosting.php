<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LlogariHosting extends Model
{
    use HasFactory;

    protected $table = 'llogari_hostings';

    protected $fillable = [
        'emri',
        'statusi',
        'hapesira_disk_gb',
        'klienti_id',
        'paketa_id',
        'server_id',
    ];
}

