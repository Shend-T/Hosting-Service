<?php

namespace App\Models;

use App\Models\Abonimi;

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

    public function abonimet()
    {
        return $this->hasMany(Abonimi::class, 'klienti_id');
    }
}
