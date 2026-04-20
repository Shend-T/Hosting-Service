<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['emri', 'mbiemri', 'email', 'password'];
    protected $hidden = ['password'];
    protected $casts = ['password' => 'hashed'];
}
