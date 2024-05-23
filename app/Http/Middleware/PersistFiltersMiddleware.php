<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class PersistFiltersMiddleware
{
    /**
     * Ensures filters are kept when redirecting in and out of the to do list page.

     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->route()->getName() === 'todo-list.show'){
            $todoList = $request->route()->parameter('todo_list');

            if (session('should_apply_filters')) {
                if (session('should_apply_filters_for_todo_list') === $todoList->id) {
                    $request->merge(['filters' => session('filters')]);
                }
                session(['should_apply_filters' => false]);
            } else {
                session(['filters' => $request->get('filters')]);
            }

            Inertia::share('filters', $request->get('filters'));
            session(['should_apply_filters_for_todo_list' => $todoList->id]);
        } else {
            session(['should_apply_filters' => true]);
        }

        return $next($request);
    }
}
