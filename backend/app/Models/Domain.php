<?php

namespace App\Models;

use App\Models\Klienti;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    use HasFactory;

    protected $table = 'domains';

    protected $fillable = [
        'klienti_id',
        'emri_domainit',
        'tld',
        'nameserverat',
        'statusi',
        'data_regjistrimit',
        'data_skadimit'
    ];

    public function klienti()
    {
        return $this->belongsTo(Klienti::class, 'klienti_id');
    }
}

/*
Klienti -> Abonimi -> Pakete
|           |
v           v
Llogari hosting
    |
    v
  Server <- MonitorimServer
*/