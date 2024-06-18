<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;



class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    )
    {}

    public function login(LoginRequest $request) : JsonResponse
    {
        $result = $this->authService->authenticate($request->validated());

        if (!$result) {
            return response()->json("INVALID_CREDENTIALS", Response::HTTP_UNAUTHORIZED);
        }

        return response()->json($result, Response::HTTP_OK);
    }

    public function logout(Request $request, $sessionId): JsonResponse
    {
        $result = $this->authService->unauthenticate($request->user(), $sessionId);

        return response()->json($result, Response::HTTP_OK);
    }
}
