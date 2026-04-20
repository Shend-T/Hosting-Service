<?php

namespace App\Models;

use App\Models\LlogariHostings;
use App\Models\MonitorimServer;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servers extends Model
{
    use HasFactory;

    protected $table = 'servers';

    protected $fillable = [
        'emri',
        'ip_adresa',
        'lloji',
        'sistemi_operativ',
        'ram_gb',
        'cpu_core',
        'hapesira_tb',
        'lokacioni',
        'statusi',
        'data_instalimit'
    ];

    public function llogariHostings()
    {
        return $this->hasMany(LlogariHostings::class, 'server_id');
    }

    public function monitorimi()
    {
        return $this->hasMany(MonitorimServer::class, 'serveri_id');
    }
}
