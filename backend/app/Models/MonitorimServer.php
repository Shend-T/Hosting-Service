<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonitorimServer extends Model
{
    use HasFactory;

    protected $table = 'monitorim_servers';

    protected $fillable = [
        'server_id',
        'cpu_usage',
        'ram_usage',
        'disk_usage',
        'statusi',
        'checked_at',
    ];
}

