import { receiveServerErrors } from './server_actions';
import * as InviteAPIUtil from '../utils/invitation_utils';

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

export const removeInvitation = inviteId => ({
    type: REMOVE_INVITATION,
    inviteId,
});

export const createInvite = (serverId, expiration=null) => dispatch => {
    return InviteAPIUtil.createInvite(serverId,expiration)
        .then(
            invitation => dispatch(receiveInvitation(invitation)),
            err => dispatch(receiveServerErrors(err.responseJSON))
        );
};

export const destroyInvite = inviteId => dispatch => {
    InviteAPIUtil.destroyInvite(inviteId)
        .then(
            () => dispatch(removeInvitation(inviteId)),
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