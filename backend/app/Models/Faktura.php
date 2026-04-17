<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faktura extends Model
{
    protected $table = 'faturat';

    protected $fillable = [
        'klienti_id',
        'abonimi_id',
        'shuma',
        'data_leshimit',
        'data_skadimit',
        'statusi',
        'pershkrimi',
    ];

    public function klienti()
    {
        return $this->belongsTo(Klienti::class, 'klienti_id');
    }

    public function abonimi()
    {
        return $this->belongsTo(Abonimi::class, 'abonimi_id');
    }
}