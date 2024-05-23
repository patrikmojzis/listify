<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Retrieve accepted shares and map them to the desired format
        $acceptedShares = $this->shares()->accepted()->get()->map(function ($share) {
            $user = $share->user;
            return [
                'id' => $user->id,
                'name' => $user->name,
                'initials' => $user->initials,
                'share_id' => $share->id,
                'is_owner' => false,
            ];
        });

        // Add the owner user information
        $owner = [
            [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'initials' => $this->user->initials,
                'share_id' => null,
                'is_owner' => true,
            ]
        ];

        return [
            'id' => $this->id,
            'name' => $this->name,
            'users' => collect($owner)->concat($acceptedShares)->all(),
            'pending_invitations' => $this->shares()->pending()->get()->map(fn($share) => [
                'share_id' => $share->id,
                'email' => $share->invitation_email,
            ]),
        ];
    }
}
