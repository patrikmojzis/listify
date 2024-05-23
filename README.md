# Listify: Todo List App 
A simple todo list app built with Laravel and Inertia.js React.

## How to run
1. Clone the repository
2. Run `cp .env.example .env` to create a new `.env` file
3. Run `touch database/database.sqlite` to create a new sqlite database
4. Run `npm install && composer install` to install the dependencies
5. Run `php artisan key:generate` to generate a new key
6. Run `php artisan migrate` to create the database tables
7. Run `php artisan db:seed` to seed the database with some data
8. Run `php artisan serve` & `npm run dev` to start the dev server and compile the assets
9. Open the browser and navigate to [http://localhost:8000](http://localhost:8000)

### Test User
- Email: `listify@example.com`
- Password: `password`

## Features
- User authentication
- Create and display in todo lists
- Display, create, update, delete, restore and complete todos
- Filter todos by status, assignee
- Collaborating with other users on todo lists
- Pagination
- Email notifications on todo complete
- Email invitations to collaborate on todo lists
- (...)

## Time spent
5 man-days

## Video demo
[Watch the video demo](https://drive.google.com/file/d/1hNZgMr-VeyAdKEV8wO7Iy-msBp4TlBuH/view?usp=sharing)
