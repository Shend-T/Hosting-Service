<?php

namespace App\Models;

use App\Models\Abonimi;
use App\Models\Servers;
use App\Models\Tiketi;
use App\Models\Domain;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LlogariHostings extends Model
{
    use HasFactory;

    protected $table = 'llogari_hostings';

    protected $fillable = [
        'abonimi_id',
        'server_id',
        'username',
        'hapesira_perdorur',
        'bandwith_perdorur',
        'data_krijimit',
        'statusi',
        'ip_dedikuar'
    ];

    public function abonimi()
    {
        return $this->belongsTo(Abonimi::class, 'abonimi_id');
    }

    public function server()
    {
        return $this->belongsTo(Servers::class, 'server_id');
    }
    public function tiketa()
    {
        return $this->hasMany(Tiketi::class, 'llogari_hostings_id');
    }

    public function domains()
    {
        return $this->hasMany(Domain::class, 'llogari_hostings_id');
    }
}

