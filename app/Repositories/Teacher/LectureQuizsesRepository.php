<?php

namespace App\Repositories\Teacher;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Repositories\BaseRepository;

class LectureQuizsesRepository extends BaseRepository
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
        $payload['questions'] = json_encode($payload['questions']);
        $payload['title_slug'] = Str::slug($payload['title']);

        return parent::create($payload);
    }
}
