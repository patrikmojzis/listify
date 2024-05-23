<?php

namespace App\Http\Requests;

use App\Rules\HasTodoListPermission;
use Illuminate\Foundation\Http\FormRequest;

class TodoItemStoreRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'todo_list_id' => ['required', new HasTodoListPermission],
            'assigned_to' => ['sometimes', 'array'],
            'assigned_to.*' => ['exists:users,id'],
            'completed' => ['sometimes', 'boolean'],
        ];
    }
}
