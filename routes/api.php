<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SystemController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\AccountsController;
use App\Http\Controllers\Api\Admin\RolesController;

/**
 * Teacher
 */
use App\Http\Controllers\Api\Teacher\LecturesController;
use App\Http\Controllers\Api\Teacher\LectureQuizsesController;

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


    /**
     * Auth Routes
     */
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->name('auth.login');
        Route::post('request-otp', [AuthController::class, 'requestOtp'])->name('auth.request-otp');

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        });
    });

    /**
     * Admin Routes
     */
    Route::prefix('admin')->middleware(['auth:sanctum', 'role.admin'])->group(function () {
        Route::apiResources([
            'accounts' => AccountsController::class,
            'roles' => RolesController::class,
        ]);


        /**
         * Assign role to account
         */
        Route::patch('accounts/{accountId}role/assign/{userRoleId}', [AccountsController::class, 'assignRoleToAccount']);
        Route::patch('accounts/{accountId}role/unassign', [AccountsController::class, 'unassignRoleToAccount']);
    });

    /**
     * Teacher Routes
     */
    Route::prefix('teacher')->middleware(['role.teacher'])->group(function () {
        Route::apiResources([
            'lectures'          => LecturesController::class,
            'lecture-quizses'   => LectureQuizsesController::class,

        ]);
    });
});
