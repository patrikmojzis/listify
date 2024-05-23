import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import {ModalContextType} from "./ModalContext.d";
import {createPortal} from 'react-dom';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modals, setModals] = useState([]);

    const push = useCallback((modal) => {
        setModals(currentModals => [...currentModals, modal]);
    }, []);

    const pop = useCallback(() => {
        setModals(currentModals => currentModals.slice(0, currentModals.length - 1));
    }, []);

    return (
        <ModalContext.Provider value={{ modals, push, pop }}>
            {children}
            {modals.map((ModalComponent, index) => (
                // Rendering modals using React Portal
                createPortal(
                    ModalComponent,
                    document.getElementById('modal-root')
                )
            ))}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within an ModalContext');
    }
    return context;
};
