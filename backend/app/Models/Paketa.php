<?php

namespace App\Models;

use App\Models\Abonimi;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Paketa extends Model
{
    use HasFactory;

    protected $table = 'paketa';

    protected $fillable = [
        'emri',
        'pershkrimi',
        'hapesira_gb',
        'bandwidth_gb',
        'nr_domaineve',
        'nr_emaileve',
        'ssl',
        'cmimi_mujor',
        'cmimi_vjetor',
        'statusi'
    ];

    public function abonimet()
    {
        return $this->hasMany(Abonimi::class, 'paketa_id');
    }
}
