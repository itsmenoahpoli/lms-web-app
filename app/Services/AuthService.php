<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\UserSession;


class AuthService {
    public function __construct(
        private readonly UserSession $userSession
    )
    {}

    private function createSessionLog($user)
    {
        $sessionId = Str::random(10);
        $session = $this->userSession->create([
            'session_id'    => $sessionId,
            'user_id'       => $user->id,
            'user_name'     => $user->name,
            'user_email'    => $user->email,
            'signinAt'      => now()
        ]);

        return $session;
    }

    private function endSessionLog($sessionId, $userId)
    {
        //
    }

    public function authenticate($credentials)
    {
        if (Auth::attempt($credentials))
        {
            /**
             * @var App\Models\User $user
             */
            $user = Auth::user();
            $token = $user->createToken()->plainTexttoken;
            $session = $this->createSessionLog($user);

            return (object) array(
                'token'     => $token,
                'user'      => $user,
                'session'   => $session
            );
        }
    }
}
