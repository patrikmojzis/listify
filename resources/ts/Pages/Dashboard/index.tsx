import React, {useMemo} from 'react';
import {Link} from '@inertiajs/react';
import styles from './style.module.scss';
import DashboardLayout from "@/Layouts/DashboardLayout";
import {DashboardProps} from './index.d';

const Dashboard = ({pending_invitations}: DashboardProps) => {

    const mappedInvitations = useMemo(() => {
        return pending_invitations.map((inv) => (<div className={styles.invitation}>
            <div>{inv.todo_list.name}</div>
            <Link href={inv.invitation_url}>Confirm</Link>
        </div>));
    }, [pending_invitations]);

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3>Dashboard</h3>
                </div>

                <div className={styles.section}>
                    <strong>Invitations</strong>
                    <div className={styles.invitations}>
                        {mappedInvitations.length > 0 ? mappedInvitations :
                            <div className={styles.emptyText}>No pending invitations</div>}
                    </div>
                </div>


            </div>
        </DashboardLayout>
    );
}

export default Dashboard;
