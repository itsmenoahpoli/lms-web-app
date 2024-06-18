<?php

namespace App\Repositories\Admin;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;

class AccountsRepository extends BaseRepository
{
    public function __construct(
        private readonly Model $model,
        private readonly array $relationships = [])
    {
        parent::__construct($model, $relationships);
    }
}
