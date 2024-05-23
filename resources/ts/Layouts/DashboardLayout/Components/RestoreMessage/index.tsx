import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import styles from './style.module.scss';

const DURATION: number = 9000;

const RestoreMessage = forwardRef((props, ref) => {

    const [message, setMessage] = useState<string>(null);
    const callbackRef = useRef(null);

    useImperativeHandle(ref, () => ({
        display(message: string, callback: () => void | Promise<void>) {
            setMessage(message);
            callbackRef.current = callback;
        }
    }), []);

    useEffect(() => {
        if (!message) return;
        const timeout = setTimeout(() => {
            setMessage(null);
            callbackRef.current = null;
        }, DURATION);

        return () => clearTimeout(timeout);
    }, [message]);

    const onClick = useCallback(() => {
        setMessage(null);
        callbackRef.current && callbackRef.current();
        callbackRef.current = null;
    }, []);

    return message && (
        <div className={styles.container}>
            <div className={styles.text}>
                {message}
            </div>
            <div className={styles.action}>
                <a onClick={onClick}>Undo</a>
            </div>
        </div>
    );
});


export default RestoreMessage;
