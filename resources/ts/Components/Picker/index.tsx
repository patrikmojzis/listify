import React, {useCallback, useMemo} from 'react';
import styles from './style.module.scss';
import {PickerProps} from "./index.d";

const Picker: React.FC<PickerProps> = ({isSelected, onChange}) => {

    const handleClick = useCallback(() => {
        onChange(!isSelected);
    }, [isSelected, onChange]);

    const dotConstructedClasses = useMemo(() => {
        let classes = [styles.dot];
        if (isSelected) classes.push(styles.selected);
        return classes.join(' ');
    }, [isSelected]);

    return (
        <div role={"checkbox"} className={styles.container} onClick={handleClick}>
            <div className={dotConstructedClasses} />
        </div>
    );
}


export default Picker;
