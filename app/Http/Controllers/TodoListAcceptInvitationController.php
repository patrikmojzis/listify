<?php

namespace App\Http\Controllers;

use App\Models\TodoListShare;
use Illuminate\Http\Request;

class TodoListAcceptInvitationController extends Controller
{
    public function __invoke(Request $request, string $token)
    {
        if (! $request->user()) {
            return redirect()->route('login')->with([
                'redirect_to' => route('accept-invitation', $token)
            ]);
        }

        $todoListShare = TodoListShare::where('invitation_token', $token)->firstOrFail();

        if ($request->user()->id == $todoListShare->invited_by_user_id) {
            return to_route('dashboard')->withErrors(['accept_invitation' => 'cannot_accept_own_invitation']);
        }

        if ($todoListShare->accepted_at) {
            return to_route('dashboard')->withErrors(['accept_invitation' => 'invitation_already_accepted']);
        }

        $todoListShare->update([
            'accepted_at' => now(),
            'user_id' => $request->user()->id
        ]);

        return to_route('todo-list.show', ['todo_list' => $todoListShare->todo_list_id]);

    }
}
