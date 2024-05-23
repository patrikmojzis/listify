<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'todo_list_id' => $this->todo_list_id,
            'completed' => $this->completed,
            'assigned_to' => $this->assigned_users?->map(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'initials' => $user->initials,
            ]),
        ];
    }
}
