export type ModalContextType = {
    modals: any[];
    push: (modal: any) => void;
    pop: () => void;
}