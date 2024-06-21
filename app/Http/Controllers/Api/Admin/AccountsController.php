<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
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
        $params = ParamsHelpers::paginationParams($request->query());
        $result = ParamsHelpers::hasExpectsRawList($params)
            ? $this->service->getUnpaginated()
            : $this->service->getPaginated(
                $params['pageNumber'],
                $params['pageSize'],
                $params['orderBy'],
                $params['sortBy']
            );

        return response()->json($result, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateAccountRequest $request)
    {
        $result = $this->service->create(
            $request->safe($request->validated)
        );

        return response()->json($result, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $result = $this->service->getById($id);

        return response()->json($result, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, string $id)
    {
        $result = $this->service->updateById(
            $id,
            $request->safe($request->validated)
        );

        return response()->json($result, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->service->deleteById($id);

        return response()->json($result, Response::HTTP_NO_CONTENT);
    }
}
