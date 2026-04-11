<?php

namespace App\Models;

use App\Models\Abonimi;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Klienti extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $table = 'klienti';

    protected $fillable = [
        'emri',
        'mbiemri',
        'kompania',
        'email',
        'password',
        'telefoni',
        'adresa',
        // 'data_regjistrimit',
        'statusi',
        'bilanci'
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    public function abonimet()
    {
        return $this->hasMany(Abonimi::class, 'klienti_id');
    }
}
