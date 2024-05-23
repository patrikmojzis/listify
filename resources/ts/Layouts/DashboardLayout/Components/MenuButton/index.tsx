import React, {useMemo} from 'react';
import styles from './style.module.scss';
import {MenuButtonProps} from './index.d';
import {Link} from "@inertiajs/react";

const MenuButton = ({ icon, label, isActive, className, href }: MenuButtonProps) => {

    const constructedClassName = useMemo(() => {
        let classes = [styles.menuButton];
        if (isActive) classes.push(styles.active);
        if (className) classes.push(className);
        return classes.join(" ");
    }, [isActive, className]);

    return (
        <Link href={href} as={"button"} className={constructedClassName}>
            <div className={styles.menuIcon}>{icon}</div>
            <div className={styles.menuText}>{label}</div>
        </Link>
    );
}

export default MenuButton;
