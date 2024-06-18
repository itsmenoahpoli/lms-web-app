<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Repositories\Admin\AccountsRepository;

class AccountsService extends AccountsRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model, ['user_role', 'user_otps', 'user_sessions']);
    }
}
