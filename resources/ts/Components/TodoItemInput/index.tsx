import React, {useCallback} from 'react';
import SelectUsers from "@/Components/SelectUsers/index";
import {uuid} from "@/Types/global";

const TodoItemInput = ({data, setData, errors, clearErrors, users}) => {

    const handleChange = useCallback((e) => {
        setData(e.target.name, e.target.value);
        if (errors) clearErrors(e.target.name);
    }, [setData, errors]);

    const handleSelectedUsersChange = useCallback((selectedUsers: uuid[]) => {
        setData('assigned_to', selectedUsers);
    }, [setData]);

    return (
        <>
            <input type="text" placeholder="Title" name={"title"} onChange={handleChange} autoComplete={"off"} value={data.title} aria-invalid={!!errors.title} autoFocus required/>
            <textarea rows={7} placeholder={"Description"} name={"description"} value={data.description} aria-invalid={!!errors.description} onChange={handleChange}></textarea>

            <strong>Assigned people:</strong>
            <SelectUsers
                users={users}
                defaultSelectedUserIds={data.assigned_to}
                onChange={handleSelectedUsersChange}
            />
        </>
    );
}

export default TodoItemInput;
