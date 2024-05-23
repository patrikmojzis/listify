import React, {useMemo} from 'react';
import styles from './style.module.scss';

const Avatar = ({initials, size = 50}) => {

    const style = useMemo(() => {
        return {
            width: size,
            height: size,
            fontSize: `${size / 2.5}px`
        };
    }, [size]);

    return (
        <div className={styles.container} style={style}>
            {initials}
        </div>
    );
}

export default React.memo(Avatar);
