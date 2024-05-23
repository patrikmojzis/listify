<?php

namespace App\Policies;

use App\Models\TodoList;
use App\Models\User;

class TodoListPolicy
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
    public function view(User $user, TodoList $todoList): bool
    {
        return $todoList->hasPermission($user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TodoList $todoList): bool
    {
        return $todoList->hasPermission($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TodoList $todoList): bool
    {
        return $todoList->hasPermission($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TodoList $todoList): bool
    {
        return $todoList->hasPermission($user);
    }

    public function share(User $user, TodoList $todoList): bool
    {
        return $todoList->hasPermission($user);
    }

    public function unshare(User $user, TodoList $todoList): bool
    {
        return $todoList->hasPermission($user);
    }
}
