<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
            $statusCode = $exception->getStatusCode();
        } else {
            $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR;
        }

        if ($statusCode === Response::HTTP_INTERNAL_SERVER_ERROR) {
            return $this->errorResponse($exception);
        }

        return parent::render($request, $exception);
    }

    /**
     * Create a JSON response for 500 errors.
     *
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function errorResponse(Throwable $exception): JsonResponse
    {
        $response = [
            'message' => 'Internal Server Error',
            'error' => $exception->getMessage(),
            'code' => 500,
        ];

        return response()->json($response, 500);
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
