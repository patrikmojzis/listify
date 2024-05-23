<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use App\Models\TodoListShare;
use Illuminate\Http\Request;

class TodoListUnshareController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, TodoList $todoList, TodoListShare $todoListShare)
    {
        $this->authorize('unshare', $todoList);
        $todoListShare->delete();
        return to_route('todo-list.show', ['todo_list' => $todoList->id]);
    }
}
