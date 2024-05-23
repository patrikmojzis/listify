<?php

namespace Database\Seeders;

use App\Models\TodoItem;
use App\Models\TodoList;
use App\Models\TodoListShare;
use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create(['email' => 'listify@example.com']);

        User::factory(2)->create();
        TodoList::factory(9)->create();
        TodoListShare::factory(10)->create();
        TodoItem::factory(50)->create();
    }
}
