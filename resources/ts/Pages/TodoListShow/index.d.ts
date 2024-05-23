import {Paginated, TodoItem, TodoList, User} from "../../Types/global";

export type TodoListShowProps = {
    errors: Record<string, string>;
    todoItemsPaginated: Paginated<TodoItem>;
    todoList: TodoList;
    auth: {
        user: User;
    },
    filters: any[],
    flash: {
        undo?: {
            type: string;
            url: string;
        }
    };
}
