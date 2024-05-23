import React, {useCallback, useMemo} from 'react';
import styles from './style.module.scss';
import Avatar from "@/Components/Avatar/index";
import {TodoItem as TodoItemType} from "@/Types/global";
import {router} from '@inertiajs/react';

const TodoItem = ({id, title, description, completed, assigned_to }: TodoItemType) => {

    const constructedClassName = useMemo(() => {
        let classes = [styles.container];
        if (completed) classes.push(styles.completed);
        return classes.join(' ');
    }, [completed]);

    const handleCheckboxClick = useCallback((e) => {
        e.stopPropagation();
        console.log(!completed);
        router.patch(`/todo-item/${id}`, {
            completed: !completed
        });
    }, [completed]);

    const mappedAvatars = useMemo(() => {
        return assigned_to?.map(user => (
            <Avatar key={user.id} initials={user.initials} size={30} />
        ));
    }, [assigned_to]);

    const onClick = useCallback(() => {
        router.get(`/todo-item/${id}`);
    }, [id]);

    return (
        <div role={"button"} className={constructedClassName} onClick={onClick}>
            <div className={styles.checkbox}>
                <input type={"checkbox"} onChange={handleCheckboxClick} checked={completed} />
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title || 'New Task'}</div>
                { description && <div className={styles.description}>{description}</div> }
                <div className={styles.avatars}>
                    {mappedAvatars}
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
