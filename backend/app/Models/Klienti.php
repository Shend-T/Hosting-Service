<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Klienti extends Model
{
    use HasFactory;

    protected $table = 'klienti';

    protected $fillable = [
        'emri',
        'mbiemri',
        'kompania',
        'email',
        'telefoni',
        'adresa',
        // 'data_regjistrimit',
        'statusi',
        'bilanci'
    ];
}
