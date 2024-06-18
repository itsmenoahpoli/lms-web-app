<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Admin\AccountsService;
use App\Http\Requests\Admin\User\CreateAccountRequest;
use App\Http\Requests\Admin\User\UpdateAccountRequest;
use App\Helpers\ParamsHelpers;

class AccountsController extends Controller
{
    public function __construct(
        private readonly AccountsService $service
    )
    {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try
        {
            $params = ParamsHelpers::paginationParams($request->query());
            $result = ParamsHelpers::hasExpectsRawList($params)
                ? $this->service->getUnpaginated()
                : $this->service->getPaginated(
                    $params['pageNumber'],
                    $params['pageSize'],
                    $params['orderBy'],
                    $params['sortBy']
                );
            return response()->json($result, 200);
        } catch (\Exception $error)
        {
            return response()->json($error, 500);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateAccountRequest $request)
    {
        try
        {
            $result = $this->service->create(
                $request->safe($request->validated)
            );
            return response()->json($result, 201);
        } catch (\Exception $error)
        {
            return response()->json($error, 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try
        {
            $result = $this->service->getById($id);
            return response()->json($result, 200);
        } catch (\Exception $error)
        {
            return response()->json($error, 500);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, string $id)
    {
        try
        {
            $result = $this->service->updateById(
                $id,
                $request->safe($request->validated)
            );
            return response()->json($result, 200);
        } catch (\Exception $error)
        {
            return response()->json($error, 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try
        {
            $result = $this->service->deleteById($id);
            return response()->json($result, 204);
        } catch (\Exception $error)
        {
            return response()->json($error, 500);
        }
    }
}
