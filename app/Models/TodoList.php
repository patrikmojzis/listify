<?php

namespace App\Models;

use App\Observers\TodoListObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;


#[ObservedBy([TodoListObserver::class])]
class TodoList extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'name',
        'user_id',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(TodoItem::class);
    }

    public function shares(): HasMany
    {
        return $this->hasMany(TodoListShare::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function hasPermission(User $user): bool
    {
        return $this->user_id === $user->id || $this->shares->contains('user_id', $user->id);
    }

    public function scopeAccessibleByUser($query, User $user)
    {
        return $query->where('user_id', $user->id)
            ->orWhereHas('shares', fn ($query) => $query->where('user_id', $user->id));
    }
}
