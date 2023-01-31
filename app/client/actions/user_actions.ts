import * as UserAPIUtil from '../utils/user_utils';
import {
  RECEIVE_NEW_MEMBER,
  RECEIVE_USER_ERRORS,
  RECEIVE_USERS,
  REMOVE_USER,
} from '@constants';

export const receiveUsers = (users) => ({ type: RECEIVE_USERS, users });
export const removeUser = (userId) => ({ type: REMOVE_USER, userId });
const receiveUserErrors = (errors) => ({ type: RECEIVE_USER_ERRORS, errors });
export const receiveNewMember = (payload) => ({ type: RECEIVE_NEW_MEMBER, payload });

export const retrieveServerMembers = (serverId) => (dispatch) => {
  return UserAPIUtil.getServerMembers(serverId)
    .then(
      (users) => dispatch(receiveUsers(users)),
      (err) => dispatch(receiveUserErrors(err.responseJSON)),
    );
};