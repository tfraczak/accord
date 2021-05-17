
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

const removeInvitation = inviteId => ({
    type: REMOVE_INVITATION,
    inviteId,
});

export const createInvite = (serverId, expiration) => dispatch => {
    ServerAPIUtil.createInvite(serverId,expiration).then(invitation => {
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

export const retrieveServerInvitations = serverId => dispatch => {
    ServerAPIUtil.getInvitations(serverId).then(invitations => {
        dispatch(receiveInvitations(invitations));
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON));
    });
};