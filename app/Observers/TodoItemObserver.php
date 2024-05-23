<?php

namespace App\Observers;

use App\Models\TodoItem;
use App\Notifications\TodoItemCompletedNotification;

class TodoItemObserver
{
    public function updating(TodoItem $todoItem): void
    {
        if ($todoItem->isDirty('completed') && $todoItem->completed === true) {
            # Notify all users who have access to the list except the user who completed the task
            $todoItem->assigned_users->each(function ($user) use ($todoItem) {
                if ($user->id !== auth()->id()) $user->notify(new TodoItemCompletedNotification($todoItem));
            });
        }
    }

}
