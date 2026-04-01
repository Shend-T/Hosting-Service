<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tiketi extends Model
{
    protected $table = 'tiketis';

    protected $fillable = [
        'klienti_id',
        'llogaria_id',
        'titulli',
        'pershkrimi',
        'prioriteti',
        'statusi',
        'data_hapjes',
        'data_mbylljes',
        'kategoria',
    ];

    public function klienti()
    {
        return $this->belongsTo(Klienti::class, 'klienti_id');
    }

    public function llogaria()
    {
        return $this->belongsTo(LlogariaHosting::class, 'llogaria_id');
    }

    public function pergjigjet()
    {
        return $this->hasMany(PergjigjjaTiketit::class, 'tiketi_id');
    }
}