<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todo_list_shares', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('todo_list_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->timestamp('accepted_at')->nullable();
            $table->string('invitation_email')->nullable();
            $table->string('invitation_token')->nullable();
            $table->foreignUuid('invited_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_list_shares');
    }
};
