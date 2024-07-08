<?php

namespace App\Repositories\Teacher;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Repositories\BaseRepository;

class LecturesRepository extends BaseRepository
{
    public function __construct(
        private readonly Model $model,
        private readonly array $relationships = [],
        private readonly array $shownRelationshipsInList = []

    )
    {
        parent::__construct(
            $model,
            $relationships,
            $shownRelationshipsInList,
            []
        );
    }

    public function create($payload)
    {
        $payload['lecture_no'] = 'LECTURE'.time();
        $payload['name_slug'] = Str::slug($payload['name']);

        return parent::create($payload);
    }
}
