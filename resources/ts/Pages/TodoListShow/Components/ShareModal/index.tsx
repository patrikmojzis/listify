import React, {useCallback, useMemo} from 'react';
import styles from './style.module.scss';
import Modal from "@/Components/Modal/index";
import {useModal} from "@/Contexts/ModalContext";
import Avatar from "@/Components/Avatar/index";
import {router, useForm, usePage} from "@inertiajs/react";
import {TodoListShowProps} from '../../index.d';


const ShareModal = () => {

    const {todoList} = usePage<TodoListShowProps>().props;

    const {data, setData, errors, clearErrors, post} = useForm({
        invitation_email: "",
    });

    const {pop} = useModal();

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        post(`/todo-list/${todoList.id}/share`)
    }, [pop, post, todoList.id])

    const handleChange = useCallback((e) => {
        setData(e.target.name, e.target.value);
        if (errors) clearErrors(e.target.name);
    }, [setData, errors]);

    const handleRemoveShare = useCallback((shareId) => {
        router.delete(`/todo-list/${todoList.id}/share/${shareId}`);
    }, [router.delete, todoList.id]);

    const mappedUsers = useMemo(() => {
        return todoList.users.map((user) => (
            <div className={styles.user} key={user.id}>
                <div className={styles.details}>
                    <Avatar initials={user.initials} size={30}/>
                    <div className={styles.name}>{user.name}</div>
                </div>
                { !user.is_owner && <a className={styles.remove} onClick={() => handleRemoveShare(user.share_id)}>Remove</a> }
            </div>
        ))
    }, [todoList.users, handleRemoveShare]);

    const mappedPendingInvitations = useMemo(() => {
        return todoList.pending_invitations.map((inv) => (
            <div className={styles.user} key={inv.share_id}>
                <div className={styles.details}>
                    <div className={styles.name}>{inv.email}</div>
                </div>
                <a className={styles.remove} onClick={() => handleRemoveShare(inv.share_id)}>Remove</a>
            </div>
        ))
    }, [todoList.pending_invitations]);

    return (
        <Modal>
            <div className={styles.container}>
                <form onSubmit={onSubmit} className={styles.form}>
                    <input type={"email"} placeholder={"Email"} name={"invitation_email"} onChange={handleChange}
                           aria-invalid={!!errors.invitation_email} value={data.invitation_email} autoComplete={"off"} required/>
                    <button type={"submit"}>Invite</button>
                </form>

                <div className={styles.users}>
                    {mappedUsers}
                    {mappedPendingInvitations}
                </div>
            </div>
        </Modal>
    );
};


export default ShareModal;
