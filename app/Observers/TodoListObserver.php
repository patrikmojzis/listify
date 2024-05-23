<?php

namespace App\Observers;

use App\Models\TodoList;

class TodoListObserver
{
    public function creating(TodoList $todoList): void
    {
        $todoList->user_id = $todoList->user_id ?? auth()->id();
    }
}
