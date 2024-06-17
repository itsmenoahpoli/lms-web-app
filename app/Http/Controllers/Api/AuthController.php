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
            return response()->json("INVALID CREDENTIALS", Response::HTTP_UNAUTHORIZED);
        }

        return response()->json("INVALID CREDENTIALS", Response::HTTP_OK);

    }
}
