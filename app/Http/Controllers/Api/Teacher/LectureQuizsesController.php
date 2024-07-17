<?php

namespace App\Http\Controllers\Api\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Helpers\ParamsHelpers;
use App\Services\Teacher\LectureQuizsesService;
use App\Http\Requests\Teacher\LectureQuizses\CreateLectureQuizRequest;
use App\Http\Requests\Teacher\LectureQuizses\UpdateLectureQuizRequest;

class LectureQuizsesController extends Controller
{
    public function __construct(
        private readonly LectureQuizsesService $service
    )
    {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) : JsonResponse
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
    public function store(CreateLectureQuizRequest $request)
    {
        $result = $this->service->create(
            $request->validated(),
            $request->file('file')
        );

        return response()->json($result, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) : JsonResponse
    {
        $result = $this->service->getById($id);

        return response()->json($result, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLectureQuizRequest $request, string $id) : JsonResponse
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
    public function destroy(string $id) : JsonResponse
    {
        $result = $this->service->deleteById($id);

        return response()->json($result, Response::HTTP_NO_CONTENT);
    }
}
