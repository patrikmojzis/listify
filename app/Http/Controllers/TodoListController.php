<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoListStoreRequest;
use App\Http\Resources\TodoItemResource;
use App\Http\Resources\TodoListResource;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoListController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TodoListCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoListStoreRequest $request)
    {
        $todoList = TodoList::create($request->validated());
        return to_route('todo-list.show', ['todo_list' => $todoList->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, TodoList $todoList)
    {
        $this->authorize('view', $todoList);

        $filters = $request->input('filters', []);

        $todoItems = $todoList->items()
            ->when(isset($filters['completed']), fn ($query) => $query->where('completed', filter_var($filters['completed'], FILTER_VALIDATE_BOOLEAN)))
            ->when(isset($filters['assigned_to']), function ($query) use ($filters) {
                foreach ((array)$filters['assigned_to'] as $userId) { $query->whereJsonContains('assigned_to', $userId); }
            })
            ->orderBy('completed', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 3))
            ->appends($request->query());

        return Inertia::render('TodoListShow', [
            'todoList' => TodoListResource::make($todoList),
            'todoItemsPaginated' => TodoItemResource::collection($todoItems),
        ]);
    }
}
