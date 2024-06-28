<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepositoryInterface;
use Spatie\QueryBuilder\QueryBuilder;

class BaseRepository implements BaseRepositoryInterface
{
    private $eloquentModel;

    public function __construct(
        private readonly Model $model,
        private readonly array $relationships,
        private readonly array $showRelationshipsInList,
        private readonly array $searchFilters = [],
        private readonly array $sortFilters = [],

    )
    {
        $this->eloquentModel = $this->model->query();
    }

    public function getListUsingQueryBuilder()
    {
        $result = QueryBuilder::for($this->eloquentModel)
                ->allowedFilters($this->searchFilters)
                ->defaultSort('-id')
                ->allowedSorts($this->sortFilters)
                ->allowedIncludes($this->relationships)
                ->get();

        return $result;
    }

    public function getPaginated($page = 1, $pageSize = 25, $orderBy = 'created_at', $sortBy = 'asc')
    {
        $result = $this->eloquentModel->with($this->showRelationshipsInList)->orderBy($orderBy, $sortBy)->paginate($pageSize);

        return $result;
    }

    public function getUnpaginated($orderBy = 'id', $sortBy = 'desc')
    {
        $result = $this->eloquentModel->with($this->showRelationshipsInList)->orderBy($orderBy, $sortBy)->get();

        return $result;
    }

    public function create($data)
    {
        $result = $this->model->create($data);

        return $result;
    }

    public function updateById($id, $data)
    {
        $result = tap($this->model->find($id))->update($data)->first();

        return $result;
    }

    public function getById($id)
    {
        $result = $this->model->with($this->relationships)->find($id);

        return $result;
    }

    public function deleteById($id)
    {
        $result = $this->model->findOrFail($id)->delete();

        return $result;
    }
}
