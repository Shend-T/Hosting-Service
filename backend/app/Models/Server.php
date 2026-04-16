<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Server extends Model
{
    use HasFactory;

    protected $table = 'servers';

    protected $fillable = [
        'emri',
        'ip_address',
        'statusi',
        'ram_gb',
        'disk_gb',
        'lokacioni',
    ];
}
