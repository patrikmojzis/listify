<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoListShareRequest;
use App\Models\TodoList;

class TodoListShareController extends Controller
{
    public function __invoke(TodoListShareRequest $request, TodoList $todoList)
    {
        $this->authorize('share', $todoList);
        $todoList->shares()->firstOrCreate($request->validated());
        return to_route('todo-list.show', ['todo_list' => $todoList->id]);
    }
}
