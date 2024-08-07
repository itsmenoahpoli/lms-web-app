<?php

namespace App\Http\Requests\Teacher\Lectures;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLectureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'week_number'           => 'int|required',
            'name'                  => 'string|required',
            'description'           => 'string|required',
            'file'                  => 'nullable',
            'is_posted'             => 'nullable|boolean',
            'is_submission_open'    => 'nullable|boolean'
        ];
    }
}
