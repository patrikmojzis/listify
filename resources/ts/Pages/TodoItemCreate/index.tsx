import React, {useCallback} from 'react';
import {useForm} from '@inertiajs/react';
import styles from './style.module.scss';
import DashboardLayout from "@/Layouts/DashboardLayout";
import TodoItemInput from "@/Components/TodoItemInput";

const TodoItemCreate = ({todoList}) => {

    const form = useForm({
        title: "",
        description: "",
        todo_list_id: todoList.id,
        assigned_to: []
    })

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        form.post('/todo-item');
    }, [form.post]);

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <h3>New task</h3>
                <form className={styles.form} onSubmit={onSubmit}>
                    <TodoItemInput {...form} users={todoList?.users || []} />
                    <button type={"submit"} className={styles.button}>Create</button>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default TodoItemCreate;
