import {useEffect, useRef} from "react";
import {router, usePage} from "@inertiajs/react";
import {RestoreMessageRef} from "@/Layouts/DashboardLayout/Components/RestoreMessage/index.d";

const useRestoreMessage = () => {

    const restoreMessageRef = useRef<RestoreMessageRef>(null);
    const {flash} = usePage<any>().props;

    /**
     * Display restore message when task is deleted.
     */
    useEffect(() => {
        if(flash.undo && restoreMessageRef.current) {
            restoreMessageRef.current.display('Task deleted.', () => { return router.get(flash.undo.url) });
        }
    }, [flash.undo]);

    return {restoreMessageRef};
}

export default useRestoreMessage;
