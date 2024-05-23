<?php

namespace App\Models;

use App\Observers\TodoItemObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;


#[ObservedBy([TodoItemObserver::class])]
class TodoItem extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'title',
        'description',
        'todo_list_id',
        'assigned_to',
        'completed',
    ];

    protected function casts(): array
    {
        return [
            'assigned_to' => 'array',
            'completed' => 'boolean',
        ];
    }

    public function todoList(): BelongsTo
    {
        return $this->belongsTo(TodoList::class);
    }

    protected function assignedUsers(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                $shares = $this->todoList->shares()->whereIn('user_id', $this->assigned_to ?? [])->get()->pluck('user');
                $owner = $this->todoList->user()->whereIn('id', $this->assigned_to ?? [])->get();
                return $shares->merge($owner);
            }
        );
    }
}
