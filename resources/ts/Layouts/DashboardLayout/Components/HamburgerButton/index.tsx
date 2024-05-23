import React, {useMemo} from 'react';
import styles from './style.module.scss';
import {HamburgerButtonProps} from './index.d';

const HamburgerButton = ({ onClick, isOpen }: HamburgerButtonProps) => {

    const constructedClassName = useMemo(() => {
        const classes = [styles.hamburger];
        if (isOpen) classes.push(styles.active);
        return classes.join(' ');
    }, [isOpen]);

    return (
        <button onClick={onClick} className={constructedClassName} title={"Menu"} aria-label={"menu"}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
        </button>
    );
}

export default HamburgerButton;
