import React, {useMemo} from 'react';
import styles from './style.module.scss';
import Logo from "../../../imgs/logo.svg?react";
import {Link} from "@inertiajs/react";

const AuthLayout = ({children}) => {
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Link href={"/"}><Logo width={160} height={32}/></Link>
                </div>
                <div className={styles.childrenContainer}>
                    {children}
                </div>
                <div className={styles.copyright}>
                    {year} &copy; All rights reserved
                </div>
            </div>
            <div className={styles.background}/>
        </div>
    );
}

export default AuthLayout;
