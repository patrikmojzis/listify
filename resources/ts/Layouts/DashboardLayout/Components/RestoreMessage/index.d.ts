export type RestoreMessageRef = {
    display(message: string, callback: () => void | Promise<void>): void;
}
