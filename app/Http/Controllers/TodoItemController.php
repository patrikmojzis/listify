<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoItemStoreRequest;
use App\Http\Requests\TodoItemUpdateRequest;
use App\Http\Resources\TodoItemResource;
use App\Http\Resources\TodoListResource;
use App\Models\TodoItem;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoItemController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $todoList = TodoList::findOrFail($request->input('todo_list_id'));
        $this->authorize('create', [TodoItem::class, $todoList]);

        return Inertia::render('TodoItemCreate', [
            'todoList' => TodoListResource::make($todoList),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoItemStoreRequest $request)
    {
        $todoItem = TodoItem::create($request->validated());
        return to_route('todo-list.show', ['todo_list' => $todoItem->todo_list_id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TodoItem $todoItem)
    {
        $this->authorize('view', $todoItem);

        return Inertia::render('TodoItemUpdate', [
            'todoItem' => TodoItemResource::make($todoItem),
            'todoList' => TodoListResource::make($todoItem->todoList),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TodoItem $todoItem)
    {
        $this->authorize('update', $todoItem);

        return Inertia::render('TodoItemUpdate', [
            'todoItem' => TodoItemResource::make($todoItem),
            'todoList' => TodoListResource::make($todoItem->todoList),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TodoItemUpdateRequest $request, TodoItem $todoItem)
    {
        $this->authorize('update', $todoItem);
        $todoItem->update($request->validated());
        return to_route('todo-list.show', ['todo_list' => $todoItem->todo_list_id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoItem $todoItem)
    {
        $this->authorize('delete', $todoItem);
        $todoItem->delete();

        return to_route('todo-list.show', ['todo_list' => $todoItem->todo_list_id])
            ->with('undo', ['type' => 'todo_item_delete', 'url' => route('todo-item.restore', $todoItem->id)]);
    }

    public function restore(TodoItem $todoItem)
    {
        $this->authorize('restore', $todoItem);
        $todoItem->restore();
        return to_route('todo-list.show', ['todo_list' => $todoItem->todo_list_id]);
    }
}
