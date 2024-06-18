<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    public function user_role() : BelongsTo
    {
        return $this->belongsTo(\App\Models\UserRole::class, 'user_role_id');
    }

    public function user_otps() : HasMany
    {
        return $this->hasMany(\App\Models\UserOtp::class);
    }

    public function user_sessions() : HasMany
    {
        return $this->hasMany(\App\Models\UserSession::class);
    }
}
