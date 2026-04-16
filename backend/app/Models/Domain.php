<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    use HasFactory;

    protected $table = 'domains';

    protected $fillable = [
        'emri',
        'ip_address',
        'statusi',
        'data_skadimit',
        'klienti_id',
    ];
}

