<?php

namespace App\Services\Teacher;

use App\Models\Lectures\LectureQuiz;
use App\Repositories\Teacher\LectureQuizsesRepository;

class LectureQuizsesService extends LectureQuizsesRepository
{
    public function __construct(LectureQuiz $model)
    {
        parent::__construct($model, ['lecture'], ['lecture']);
    }
}
