<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Repositories\Admin\RolesRepository;

class RolesService extends RolesRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model, ['users']);
    }
}
