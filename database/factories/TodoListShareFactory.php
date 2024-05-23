<?php

namespace Database\Factories;

use App\Models\TodoList;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TodoListShare>
 */
class TodoListShareFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $todoList = TodoList::inRandomOrder()->first() ?? TodoList::factory();

        return [
            'todo_list_id' => $todoList->id,
            'user_id' => User::inRandomOrder()->where(['id', '!=', $todoList->user_id])->first()?->id ?? User::factory(),
            'invitation_email' => $this->faker->unique()->safeEmail,
            'accepted_at' => now(),
            'invited_by_user_id' => User::where('id',$todoList->user_id)->first()?->id ?? User::factory(),
        ];
    }
}
