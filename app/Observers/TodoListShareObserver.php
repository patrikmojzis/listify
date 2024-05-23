<?php

namespace App\Observers;

use App\Mail\TodoListShareInvitation;
use App\Models\TodoListShare;
use Illuminate\Support\Facades\Mail;

class TodoListShareObserver
{
    /**
     * Handle the TodoListShare "created" event.
     */
    public function creating(TodoListShare $todoListShare): void
    {
        $todoListShare->invitation_token = bin2hex(random_bytes(16)); # gen url safe token
        $todoListShare->invited_by_user_id = $todoListShare->invited_by_user_id  ?? auth()->id();
    }

    public function created(TodoListShare $todoListShare): void
    {
        Mail::to($todoListShare->invitation_email)->send(new TodoListShareInvitation($todoListShare));
    }

}
