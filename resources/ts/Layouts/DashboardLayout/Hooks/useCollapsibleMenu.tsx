import {useCallback, useEffect, useMemo, useState} from "react";
import styles from "@/Layouts/DashboardLayout/style.module.scss";

const useCollapsibleMenu = (menuClasses: string[] = []) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleToggleMenu = useCallback(() => setIsMenuOpen((state) => !state), []);

    // Reset menu visibility based on window width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 576 && isMenuOpen) setIsMenuOpen(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    const constructedMenuClassName = useMemo(() => {
        const classes = [...menuClasses];
        if (isMenuOpen) classes.push(styles.open);
        if (!isMenuOpen) classes.push(styles.inline);
        return classes.join(' ');
    }, [menuClasses, isMenuOpen]);

    return {isMenuOpen, handleToggleMenu, constructedMenuClassName};
}

export default useCollapsibleMenu;
