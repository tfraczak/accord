import { receiveServerErrors } from './server_actions';
import { destroy, get, post } from '@axios';
import {
  RECEIVE_INVITATIONS,
  RECEIVE_INVITATION,
  REMOVE_INVITATION,
  SOCKET_INVITATION,
} from '@constants';
import { buildUrl } from '@helpers';

const url = (id = null) => buildUrl('invitations', id);

export const receiveInvitations = (invitations) => ({ type: RECEIVE_INVITATIONS, invitations });
export const receiveInvitation = (invitation) => ({ type: RECEIVE_INVITATION, invitation });
export const socketInvitation = (invitation) => ({ type: SOCKET_INVITATION, invitation });
export const removeInvitation = (inviteId) => ({ type: REMOVE_INVITATION, inviteId });

export const createInvite = (invitation) => (dispatch) => (
  post({ url: url(), data: { invitation } })
    .then(
      (invitation) => dispatch(receiveInvitation(invitation)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    )
);

export const deleteInvite = (invite) => (dispatch) => (
  destroy({ url: url(invite.id) })
    .then(
      () => dispatch(removeInvitation(invite.id)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    )
);

export const retrieveServerInvites = (serverId) => (dispatch) => (
  get({ url: `${buildUrl('server', serverId)}/invitations` })
    .then(
      (invitations) => dispatch(receiveInvitation(invitations)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    )
);