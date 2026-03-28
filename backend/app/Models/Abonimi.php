<?php

namespace App\Models;

use App\Models\Klienti;
use App\Models\Paketa;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abonimi extends Model
{
    use HasFactory;
    protected $table = 'abonimi';

    protected $fillable = [
        'klienti_id',
        'paketa_id',
        'data_fillimit',
        'data_skadimit',
        'statusi',
        'cmimi',
        'periudha',
        'auto_rinovim'
    ];

    public function klienti()
    {
        return $this->belongsTo(Klienti::class, 'klienti_id');
    }

    public function paketa()
    {
        return $this->belongsTo(Paketa::class, 'paketa_id');
    }
}
