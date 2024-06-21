<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\UserSession;
use App\Models\UserOtp;


class AuthService {
    public function __construct(
        private readonly UserSession $userSession,
        private readonly UserOtp $userOtp
    )
    {}

    private function createSessionLog($user)
    {
        $sessionId = Str::random(10);

        return $this->userSession->query()->create([
            'session_id'    => $sessionId,
            'user_id'       => $user->id,
            'user_name'     => $user->name,
            'user_email'    => $user->email,
            'signin_at'      => now()
        ]);
    }

    private function endSessionLog($sessionId)
    {
        $session = $this->userSession
                    ->where('session_id', $sessionId)
                    ->update([
                        'signoutAt' => now()
                    ]);

        return $session;
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

        return NULL;
    }

    public function unauthenticate($user, $sessionId)
    {
        $user->currentAccessToken()->delete();
        $session = $this->endSessionLog($sessionId);

        return $session;
    }

    public function createOtp($payload)
    {
        $code = random_int(100000, 999999);
        $otp = $this->userOtp->query()->create();
    }

    public function verifyOtp($payload)
    {
        //
    }
}
