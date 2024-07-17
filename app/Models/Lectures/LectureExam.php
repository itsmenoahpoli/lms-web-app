<?php

namespace App\Models\Lectures;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class LectureExam extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function lecture() : BelongsTo
    {
        return $this->belongsTo(\App\Models\Lectures\Lecture::class);
    }
}
