<?php

namespace App\Policies;

use App\Models\TodoItem;
use App\Models\TodoList;
use App\Models\User;

class TodoItemPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TodoItem $todoItem): bool
    {
        return $todoItem->todoList->hasPermission($user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, TodoList $todoList): bool
    {
        return $todoList->hasPermission($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TodoItem $todoItem): bool
    {
        return $todoItem->todoList->hasPermission($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TodoItem $todoItem): bool
    {
        return $todoItem->todoList->hasPermission($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TodoItem $todoItem): bool
    {
        return $todoItem->todoList->hasPermission($user);
    }
}
