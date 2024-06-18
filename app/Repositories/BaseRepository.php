<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepositoryInterface;

class BaseRepository implements BaseRepositoryInterface
{
    public function __construct(
        private readonly Model $model,
        private readonly array $relationships,
    )
    {}

    public function getPaginated($page = 1, $pageSize = 25, $orderBy = 'created_at', $sortBy = 'asc')
    {
        $result = $this->model->orderBy($orderBy, $sortBy)->paginate($pageSize);

        return $result;
    }

    public function getUnpaginated($orderBy = 'created_at', $sortBy = 'asc')
    {
        $result = $this->model->orderBy($orderBy, $sortBy)->get();

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
