<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PergjigjaTiketi extends Model
{
    public $timestamps = false;

    protected $table = 'pergjigja_tiketis'; // laravel mund ta bej kete automatikisht por e specifikojme sepse perdorim gjuhen shqipe .

    protected $fillable = [
        'tiketi_id',
        'autori',
        'mesazhi',
        'data_hapjes',
        'data_mbylljes',
        'pergjigja',
        'bashkengjitja',
    ];

    public function tiketi()
    {
        return $this->belongsTo(Tiketi::class, 'tiketi_id');
}
}