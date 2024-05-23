import React, {useCallback, useMemo, useState} from 'react';
import styles from './style.module.scss';
import {SelectUsersProps} from "./index.d";
import Avatar from "@/Components/Avatar/index";
import Picker from "@/Components/Picker/index";
import {User, uuid} from "@/Types/global";

const SelectUsers: React.FC<SelectUsersProps> = ({users, defaultSelectedUserIds = [], onChange}) => {

    const [selectedUserIds, setSelectedUserIds] = useState<uuid[]>(defaultSelectedUserIds)

    const handleChange = useCallback((user) => {
        const newSelectedUserIds = selectedUserIds.includes(user.id) ? selectedUserIds.filter(u => u !== user.id) : [...selectedUserIds, user.id];
        setSelectedUserIds(newSelectedUserIds)
        onChange && onChange(newSelectedUserIds)
    }, [selectedUserIds, setSelectedUserIds, onChange]);

    const mappedUsers = useMemo(() => {
        const isSelected = (user: User) => selectedUserIds.includes(user.id);

        return users.map(user => (
                <div key={user.id} className={styles.user}>
                    <div className={styles.details}>
                        <Avatar initials={user.initials} size={30} />
                        <label className={styles.name}>{user.name}</label>
                    </div>
                    <Picker isSelected={isSelected(user)} onChange={() => handleChange(user)} />
                </div>
            ))
    }, [users, selectedUserIds, handleChange]);

    return (
        <div className={styles.container}>{ mappedUsers }</div>
    );
}


export default SelectUsers;
