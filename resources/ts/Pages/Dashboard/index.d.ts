import {Paginated, PendingInvitation, TodoItem, TodoList, User, uuid} from "../../Types/global";

export type DashboardProps = {
    errors: Record<string, string>;
    auth: {
        user: User;
    },
    pending_invitations: PendingInvitation[];
}
