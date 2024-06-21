<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserRole;

class UserRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['superadmin', 'staff', 'teacher', 'student'];

        foreach ($roles as $role)
        {
            UserRole::query()->create([
                'name'          => $role,
                'is_enabled'    => true
            ]);
        }
    }
}
