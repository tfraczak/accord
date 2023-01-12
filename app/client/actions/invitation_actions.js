import { receiveServerErrors } from './server_actions';
import * as InviteAPIUtil from '../utils/invitation_utils';

export const RECEIVE_INVITATIONS = "RECEIVE_INVITATIONS";
export const RECEIVE_INVITATION = "RECEIVE_INVITATION";
export const REMOVE_INVITATION = "REMOVE_INVITATION";
export const SOCKET_INVITATION = "SOCKET_INVITATION";

export const receiveInvitations = invitations => ({
    type: RECEIVE_INVITATIONS,
    invitations,
});

export const receiveInvitation = invitation => ({
    type: RECEIVE_INVITATION,
    invitation,
});

export const socketInvitation = invitation => ({
    type: SOCKET_INVITATION,
    invitation,
});

export const removeInvitation = inviteId => ({
    type: REMOVE_INVITATION,
    inviteId,
});

export const createInvite = (invitation) => dispatch => {
    return InviteAPIUtil.createInvite(invitation)
        .then(
            invitation => dispatch(receiveInvitation(invitation)),
            err => dispatch(receiveServerErrors(err.responseJSON))
        );
};

export const deleteInvite = invite => dispatch => {
    InviteAPIUtil.destroyInvite(invite.id)
        .then(
            () => dispatch(removeInvitation(invite.id)),
            err => dispatch(receiveServerErrors(err.responseJSON))
        );
};

export const retrieveServerInvites = serverId => dispatch => {
    InviteAPIUtil.getServerInvites(serverId)
        .then(
            invitations => dispatch(receiveInvitation(invitations)),
            err => dispatch(receiveServerErrors(err.responseJSON))
        );
};