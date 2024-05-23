<?php

namespace App\Rules;

use App\Models\TodoList;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class HasTodoListPermission implements ValidationRule
{
    /**
     * Logic to check if the user has permission to access the to_do list
     * At the same time validates if the to_do list exists
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $hasPermission = TodoList::findOrFail($value)->hasPermission(auth()->user());

        if (!$hasPermission) {
            $fail('You do not have permission to access this todo list.');
        }
    }
}
