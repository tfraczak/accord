import { get } from '@axios';
import {
  RECEIVE_NEW_MEMBER,
  RECEIVE_USER_ERRORS,
  RECEIVE_USERS,
  REMOVE_USER,
} from '@constants';
import { buildUrl } from '@helpers';

export const receiveUsers = (users) => ({ type: RECEIVE_USERS, users });
export const removeUser = (userId) => ({ type: REMOVE_USER, userId });
const receiveUserErrors = (errors) => ({ type: RECEIVE_USER_ERRORS, errors });
export const receiveNewMember = (payload) => ({ type: RECEIVE_NEW_MEMBER, payload });

export const retrieveServerMembers = (serverId) => (dispatch) => {
  return get({ url: `${buildUrl('servers', serverId)}/users` })
    .then(
      ({ data }) => dispatch(receiveUsers(data)),
      (err) => dispatch(receiveUserErrors(err.data)),
    );
};