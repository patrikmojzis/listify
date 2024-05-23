import React, {useCallback, useMemo} from 'react';
import {Link} from '@inertiajs/react';
import styles from './style.module.scss';
import DashboardLayout from "@/Layouts/DashboardLayout";
import Avatar from "@/Components/Avatar/index";
import TodoItem from "@/Pages/TodoListShow/Components/TodoItem";
import Pagination from "@/Components/Pagination/index";
import {TodoListShowProps} from './index.d';
import {ModalProvider, useModal} from "@/Contexts/ModalContext";
import FilterModal from "@/Pages/TodoListShow/Components/FilterModal/index";
import ShareModal from "@/Pages/TodoListShow/Components/ShareModal/index";
import PlusIcon from "../../../imgs/icons/plus.svg?react";
import FilterIcon from "../../../imgs/icons/filter.svg?react";
import ShareIcon from "../../../imgs/icons/share.svg?react";

const TodoListShow = ({todoItemsPaginated, todoList, filters, flash, errors}: TodoListShowProps) => {

    const {push: pushModal} = useModal();

    const handleFilterClick = useCallback(() => pushModal(<FilterModal />), [pushModal]);
    const handleInviteClick = useCallback(() => pushModal(<ShareModal />), [pushModal]);

    const mappedTodoItems = useMemo(() => {
        return todoItemsPaginated.data.map(todoItem => <TodoItem key={todoItem.id} {...todoItem} />);
    }, [todoItemsPaginated.data]);

    const mappedSharedUsers = useMemo(() => {
        return todoList.users.map(user => <Avatar key={user.id} size={40} {...user} />);
    }, [todoList.users]);

    const createTodoItemData = useMemo(() => ({todo_list_id: todoList.id}), [todoList.id]);
    const showEmptyMessage = useMemo(() => todoItemsPaginated.data.length === 0, [todoItemsPaginated.data]);
    const filterIconClass = useMemo(() => filters ? styles.filterIconActive : undefined, [filters]);

    return (
        <DashboardLayout>
            <div className={styles.container}>

                <div className={styles.header}>
                    <h3>{todoList.name}</h3>
                    <div className={styles.avatars}> { mappedSharedUsers } </div>
                </div>

                <div className={styles.buttons}>
                    <Link href={"/todo-item/create"} data={createTodoItemData} className={styles.button} as={"button"}><PlusIcon /> New Task</Link>
                    <button className={styles.buttonSecondary} onClick={handleFilterClick}><span className={filterIconClass}><FilterIcon /></span> Filter</button>
                    <button className={styles.buttonSecondary} onClick={handleInviteClick}><ShareIcon /> Collaborate</button>
                </div>

                <div className={styles.todos}>
                    {mappedTodoItems}
                    { showEmptyMessage && <div className={styles.emptyMessage}><p>No tasks found.</p></div> }
                </div>

                <Pagination meta={todoItemsPaginated.meta} links={todoItemsPaginated.links} />

            </div>
        </DashboardLayout>
    );
}


const WrappedTodoListShow = (props) => {
    return (
        <ModalProvider>
            <TodoListShow {...props} />
        </ModalProvider>
    );
}

export default WrappedTodoListShow;
