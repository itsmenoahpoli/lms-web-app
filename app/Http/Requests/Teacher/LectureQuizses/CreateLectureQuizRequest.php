<?php

namespace App\Http\Requests\Teacher\LectureQuizses;

use Illuminate\Foundation\Http\FormRequest;

class CreateLectureQuizRequest extends FormRequest
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
            'lecture_id'            => 'int|required',
            'title'                 => 'string|required',
            'description'           => 'string|nullable',
            'questions'             => 'array|required',
            'questions.*.title'     => 'string|required',
            'questions.*.answer'    => 'string|required',
        ];
    }
}
