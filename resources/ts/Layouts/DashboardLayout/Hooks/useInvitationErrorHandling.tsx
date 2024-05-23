import {useEffect} from "react";
import {usePage} from "@inertiajs/react";

const useInvitationErrorHandling = () => {

    const {errors} = usePage<any>().props;

    /**
     * Very simple error handling for invitation acceptance.
     */
    useEffect(() => {
        if (errors?.accept_invitation === 'cannot_accept_own_invitation') alert('You cannot accept your own invitation.');
        if (errors?.accept_invitation === 'invitation_already_accepted') alert('Invitation has been already accepted.');
    }, [errors]);
}

export default useInvitationErrorHandling;
