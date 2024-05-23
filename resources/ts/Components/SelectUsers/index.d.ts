import {User, uuid} from '../../types/global.d';

export type SelectUsersProps = {
    users: User[];
    defaultSelectedUserIds?: uuid[];
    onChange?: (users: uuid[]) => void | Promise<void>;
}
