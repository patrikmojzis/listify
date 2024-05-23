<?php

namespace App\Models;

use App\Observers\TodoListShareObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


#[ObservedBy([TodoListShareObserver::class])]
class TodoListShare extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'todo_list_id',
        'user_id',
        'invitation_email',
        'invitation_token',
        'accepted_at',
        'invited_by_user_id',
    ];

    public function todoList(): BelongsTo
    {
        return $this->belongsTo(TodoList::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invitedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'invited_by_user_id');
    }

    protected function invitationUrl(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => route('accept-invitation', $attributes['invitation_token'])
        );
    }

    public function scopeAccepted($query)
    {
        return $query->whereNotNull('accepted_at');
    }

    public function scopePending($query)
    {
        return $query->whereNull('accepted_at');
    }
}
