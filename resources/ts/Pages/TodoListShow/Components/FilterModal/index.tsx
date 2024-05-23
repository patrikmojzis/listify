import React, {useCallback, useMemo} from 'react';
import styles from './style.module.scss';
import Modal from "@/Components/Modal/index";
import SelectUsers from "@/Components/SelectUsers/index";
import Picker from "@/Components/Picker/index";
import {usePage} from "@inertiajs/react";
import useFiltersHook from "@/Pages/TodoListShow/Components/FilterModal/Hooks/UseFiltersHook";
import {uuid} from "@/Types/global";


const FilterModal = () => {

    const {todoList, filters} = usePage().props;

    const {data, setData, update} = useFiltersHook(filters);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        update();
    }, [update])

    const handlePendingClick = useCallback(() => setData('completed', data.completed === false ? null : false), [data.completed]);
    const handleCompletedClick = useCallback(() => setData('completed', data.completed === true ? null : true), [data.completed]);
    const handleSelectedUsersChange = useCallback((userIds: uuid[]) => setData('assigned_to', userIds), [setData]);

    const showUsers = useMemo(() => todoList.users.length > 0, [todoList]);

    return (
        <Modal>
            <form onSubmit={onSubmit} className={styles.container}>

                {showUsers && <div className={styles.filter}>
                    <strong>Assigned to</strong>
                    <SelectUsers
                        users={todoList.users}
                        onChange={handleSelectedUsersChange}
                        defaultSelectedUserIds={data.assigned_to}
                    />
                </div>}

                <div className={styles.filter}>
                    <strong>Status</strong>
                    <div className={styles.options}>
                        <div className={styles.option}>
                            <label>Pending</label>
                            <Picker isSelected={data.completed === false} onChange={handlePendingClick}/>
                        </div>
                        <div className={styles.option}>
                            <label>Completed</label>
                            <Picker isSelected={data.completed === true} onChange={handleCompletedClick}/>
                        </div>
                    </div>
                </div>

                <button type={"submit"}>Apply</button>
            </form>
        </Modal>
    );
};


export default FilterModal;
