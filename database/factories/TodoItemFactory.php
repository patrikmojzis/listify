<?php

namespace Database\Factories;

use App\Models\TodoList;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TodoItem>
 */
class TodoItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $todoList = TodoList::inRandomOrder()->first() ?? TodoList::factory();
        $shares = $todoList->shares()->accepted()->get()->pluck('user_id')->toArray();

        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph,
            'todo_list_id' => $todoList->id,
            'assigned_to' => count($shares) > 0 ? $this->faker->randomElements($shares, 1) : [],
            'completed' => $this->faker->boolean,
        ];
    }
}
