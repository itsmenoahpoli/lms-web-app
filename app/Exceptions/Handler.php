<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
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
     * @param  \Throwable  $e
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function render($request, Throwable $e) : JsonResponse
    {
        // If the request expects JSON (e.g., API request)
        if ($request->expectsJson()) {
            // If the exception is an HttpException, get the status code
            if ($e instanceof HttpException) {
                $statusCode = $e->getStatusCode();
            } else {
                // For all other exceptions, assume a 500 Internal Server Error
                $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR;
            }

            // Return a JSON response with the status code and message
            return response()->json([
                'message' => $statusCode === Response::HTTP_INTERNAL_SERVER_ERROR ? 'Internal Server Error' : $e->getMessage(),
                'status' => $statusCode
            ], $statusCode);
        }

        // For non-JSON requests, use the default behavior
        return parent::render($request, $e);
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
