<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TodoItemController;
use App\Http\Controllers\TodoListAcceptInvitationController;
use App\Http\Controllers\TodoListController;
use App\Http\Controllers\TodoListShareController;
use App\Http\Controllers\TodoListUnshareController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/login', fn() => Inertia::render('Login'))->name('login');
    Route::post('/login', LoginController::class);

    Route::get('/register', fn() => Inertia::render('Register'))->name('register');
    Route::post('/register', RegisterController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::resource('/todo-item', TodoItemController::class)->except('index');
    Route::get('/todo-item/{todoItem}/restore', [TodoItemController::class, 'restore'])->name('todo-item.restore')->withTrashed();
    Route::resource('/todo-list', TodoListController::class)->only('create', 'store', 'show');
    Route::post('/todo-list/{todoList}/share', TodoListShareController::class)->name('todo-list.share');
    Route::delete('/todo-list/{todoList}/share/{todoListShare}', TodoListUnshareController::class)->name('todo-list.unshare');

    Route::get('/accept-invitation/{token}', TodoListAcceptInvitationController::class)->name('accept-invitation');

    Route::get('/logout', LogoutController::class)->name('logout');
});
