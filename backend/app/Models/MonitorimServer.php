<?php

namespace App\Models;

use App\Models\Server;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonitorimServer extends Model
{
    use HasFactory;

    protected $table = 'monitorim_servers';

    protected $fillable = [
        'serveri_id',
        'cpu_perdorim',
        'ram_perdorim',
        'disk_perdorim',
        'bandwidth',
        'statusi',
        'alarmi'
    ];

    public function server()
    {
        return $this->belongsTo(Server::class, 'serveri_id');
    }
}

