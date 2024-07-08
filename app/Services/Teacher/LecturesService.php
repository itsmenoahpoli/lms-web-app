<?php

namespace App\Services\Teacher;

use App\Models\Lectures\Lecture;
use App\Repositories\Teacher\LecturesRepository;

class LecturesService extends LecturesRepository
{
    public function __construct(Lecture $model)
    {
        parent::__construct($model, [], []);
    }
}
