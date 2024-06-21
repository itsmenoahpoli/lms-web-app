<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SystemController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\AccountsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->middleware('verify.api-key')->group(function () {
    Route::get('healthcheck', [SystemController::class, 'healthcheck'])->name('api.healthcheck');


    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->name('auth.login');

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        });
    });

    Route::prefix('admin')->group(function () {
        Route::apiResources([
            'accounts' => AccountsController::class,
        ]);
    });
});
