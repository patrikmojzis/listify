<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Todo app</title>
        @viteReactRefresh
        @vite('resources/ts/app.tsx')
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
