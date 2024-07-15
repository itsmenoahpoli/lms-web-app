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

    public function create($payload, $file = null)
    {
        if ($file)
        {
            $path = $file->store('lectures/files', 'public');
            $payload['file'] = asset($path);
        }

        return parent::create($payload);
    }
}
