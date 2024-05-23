export type uuid = string;

export type User = {
    id: uuid;
    name: string;
    email: string;
    initials: string;
}

export type Paginated<T> = {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export type TodoItem = {
    id: uuid;
    title: string;
    description: string;
    completed: boolean;
    todo_list_id: uuid;
    assigned_to: {
        id: number;
        name: string;
        initials: string;
    }[];
}

export type PaginationLinks = {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

export type PaginationMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number | null;
}


export type TodoList = {
    id: number;
    name: string;
    users: {
        id: uuid;
        name: string;
        initials: string;
        share_id: uuid | null;
        is_owner: boolean;
    }[];
    pending_invitations: {
        share_id: uuid;
        email: string;
    }[];
}

export type PendingInvitation = {
    id: uuid;
    invitation_url: string;
    todo_list: {
        name: string;
    };
}
