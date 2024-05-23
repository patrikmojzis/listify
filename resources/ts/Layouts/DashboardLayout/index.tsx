import React, {useMemo} from 'react';
import styles from './style.module.scss';
import MenuButton from "@/Layouts/DashboardLayout/Components/MenuButton";
import {Link, usePage} from "@inertiajs/react";
import Logo from "../../../imgs/logo.svg?react";
import HomeIcon from "../../../imgs/icons/home.svg?react";
import PlusIcon from "../../../imgs/icons/plus.svg?react";
import PowerIcon from "../../../imgs/icons/power.svg?react";
import ListIcon from "../../../imgs/icons/list.svg?react";
import HamburgerButton from "@/Layouts/DashboardLayout/Components/HamburgerButton/index";
import useCollapsibleMenu from "@/Layouts/DashboardLayout/Hooks/useCollapsibleMenu";
import RestoreMessage from "@/Layouts/DashboardLayout/Components/RestoreMessage/index";
import useRestoreMessage from "@/Layouts/DashboardLayout/Hooks/useRestoreMessage";
import useInvitationErrorHandling from "@/Layouts/DashboardLayout/Hooks/useInvitationErrorHandling";


const DashboardLayout = ({ children }) => {

    const {dashboard, todoList} = usePage<any>().props;

    const {isMenuOpen, handleToggleMenu, constructedMenuClassName} = useCollapsibleMenu([styles.menuContainer]);
    const {restoreMessageRef} = useRestoreMessage();
    useInvitationErrorHandling();

    const isCreateListActive = useMemo(() => window.location.pathname === '/todo-list/create', []);
    const isDashboardActive = useMemo(() => window.location.pathname === '/', []);

    const mappedListButtons = useMemo(() => {
        return dashboard.todoLists.map(list => (
            <MenuButton href={`/todo-list/${list.id}`} key={list.id} icon={<ListIcon />} label={list.name} isActive={todoList?.id === list.id} />
        ));
    }, [dashboard.todoLists, todoList?.id]);

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.sidebar}>

                    <div className={styles.logoContainer}>
                        <Link href={"/"}><Logo width={160} height={32}/></Link>
                        <HamburgerButton onClick={handleToggleMenu} isOpen={isMenuOpen}/>
                    </div>

                    <nav className={constructedMenuClassName}>
                        <MenuButton href={'/'} icon={<HomeIcon/>} label={"Dashboard"} isActive={isDashboardActive} />
                        {mappedListButtons}
                        <MenuButton href={'/todo-list/create'} icon={<PlusIcon/>} label={"Create List"} isActive={isCreateListActive} />
                        <MenuButton href={'/logout'} icon={<PowerIcon />} label={"Sign out"} className={styles.logoutButton} />
                    </nav>

                </div>

                <div className={styles.content}>
                    <div className={styles.container}>
                        {children}
                    </div>
                </div>

            </div>
            <div id="modal-root"></div>
            <RestoreMessage ref={restoreMessageRef} />
        </>
    );
}

export default DashboardLayout;
