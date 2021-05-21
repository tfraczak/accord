import { receiveServerErrors } from './server_actions';
import * as ServerAPIUtil from '../utils/server_utils';

export const RECEIVE_INVITATIONS = "RECEIVE_INVITATIONS";
export const RECEIVE_INVITATION = "RECEIVE_INVITATION";
export const REMOVE_INVITATION = "REMOVE_INVITATION";

export const receiveInvitations = invitations => ({
    type: RECEIVE_INVITATIONS,
    invitations,
});

const receiveInvitation = invitation => ({
    type: RECEIVE_INVITATION,
    invitation,
});

export const removeInvitation = () => ({
    type: REMOVE_INVITATION,
});

export const createInvite = (serverId, expiration=null) => dispatch => {
    return ServerAPIUtil.createInvite(serverId,expiration).then(invitation => {
        dispatch(receiveInvitation(invitation));
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON));
    });
};

export const destroyInvite = inviteId => dispatch => {
    ServerAPIUtil.destroyInvite(inviteId).then(invitation => {
        dispatch(removeInvitation(invitation.id));
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON));
    });
};