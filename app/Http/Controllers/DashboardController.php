<?php

namespace App\Http\Controllers;

use App\Http\Resources\PendingInvitationResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('Dashboard', [
            'pending_invitations' => PendingInvitationResource::collection($request->user()->pendingInvitations()->get())
        ]);
    }
}
