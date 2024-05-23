import React, {useCallback} from 'react';
import {useForm} from '@inertiajs/react';
import styles from './style.module.scss';
import DashboardLayout from "@/Layouts/DashboardLayout";

const TodoItemCreate = () => {

    const {data, setData, errors, clearErrors, post} = useForm({
        name: "",
    });

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        post(`/todo-list`);
    }, [post]);

    const handleChange = useCallback((e) => {
        setData(e.target.name, e.target.value);
        if (errors) clearErrors(e.target.name);
    }, [setData, errors]);

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <h3>New List</h3>
                <form className={styles.form} onSubmit={onSubmit}>
                    <input type="text" placeholder="Name" name={"name"} aria-invalid={!!errors.name} onChange={handleChange}
                           autoComplete={"off"} value={data.name} autoFocus required/>
                    <button type={"submit"} className={styles.button}>Create</button>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default TodoItemCreate;
