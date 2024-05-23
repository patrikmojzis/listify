import React, {useCallback} from 'react';
import {router, useForm} from '@inertiajs/react';
import styles from './style.module.scss';
import DashboardLayout from "@/Layouts/DashboardLayout";
import TodoItemInput from "@/Components/TodoItemInput";
import {TodoItemUpdateProps} from './index.d';

const TodoItemUpdate = ({todoItem, todoList}: TodoItemUpdateProps) => {

    const form = useForm({
        title: todoItem.title,
        description: todoItem.description,
        assigned_to: todoItem.assigned_to?.map(u => u.id) || null,
    });

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        form.patch(`/todo-item/${todoItem.id}`);
    }, [todoItem, form.patch]);

    const onDelete = useCallback(() => {
        router.delete(`/todo-item/${todoItem.id}`);
    }, [todoItem, router.delete]);

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <h3>Task</h3>
                <form className={styles.form} onSubmit={onSubmit}>
                    <TodoItemInput {...form} users={todoList?.users || []} />
                    <button type={"submit"} className={styles.button}>Update</button>
                    <a className={styles.delete} onClick={onDelete}>Delete</a>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default TodoItemUpdate;
