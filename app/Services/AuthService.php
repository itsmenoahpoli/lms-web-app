<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\User;
use App\Models\UserSession;
use App\Models\UserOtp;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthService {
    public function __construct(
        private readonly User $user,
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
        return $this->userSession
                ->where('session_id', $sessionId)
                ->update([
                    'signoutAt' => now()
                ]);
    }

    public function authenticate($credentials)
    {
        if (Auth::attempt($credentials))
        {
            /**
             * @var App\Models\User $user
             */
            $user = Auth::user();
            $user->load('user_role');
            $token = $user->createToken(now()->timestamp)->plainTextToken;
            $session = $this->createSessionLog($user);

            return (object) array(
                'token'     => $token,
                'user'      => $user,
                'session'   => $session->session_id
            );
        }

        throw new HttpException(401, 'USER_NOT_FOUND');
    }

    public function unauthenticate($user, $sessionId)
    {
        $user->currentAccessToken()->delete();
        $session = $this->endSessionLog($sessionId);

        return $session;
    }

    public function createOtp($payload)
    {
        $user = $this->user->query()->where('email', $payload['email']);

        if (!$user) {
            throw new HttpException(404, 'USER_NOT_FOUND');
        }

        $code = random_int(100000, 999999);
        $expiresAt = Carbon::now()->addHours(2);

        // TODO: Send OTP via mail

        return $this->userOtp->query()->create([
            'code' => $code,
            'expires_at' => $expiresAt
        ]);
    }

    public function verifyOtp($payload)
    {
        //
    }
}
