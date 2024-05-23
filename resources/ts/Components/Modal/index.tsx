import React, {useCallback} from 'react';
import styles from './style.module.scss';
import {ModalProps} from './index.d';
import {useModal} from "../../Contexts/ModalContext";

const Modal: React.FC<ModalProps> = ({children}) => {

    const {pop} = useModal();

    const preventPropagation = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
    }, []);

    return (
        <div className={styles.overlay} onClick={pop} >
            <div className={styles.wrapper}>
                <div className={styles.container} onClick={preventPropagation}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
