import * as SessionAPIUtil from '../utils/session_utils';
import { getUserServers } from '../utils/server_utils';
import { convertToSnakeCase } from '../utils/func_utils';
import { getUserConversations } from '../utils/conversation_utils';
import {
  LOGOUT_CURRENT_USER,
  RECEIVE_CURRENT_USER,
  REMOVE_ERRORS,
  RECEIVE_SESSION_ERRORS,
  REMOVE_SESSION_ERRORS,
  RECEIVE_USER_LOAD_DATA,
  RECEIVE_PRIVATE_USER_LOAD_DATA,
} from '../constants';

const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

const logoutCurrentUser = () => ({ type: LOGOUT_CURRENT_USER });

const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

const receiveUserLoadData = (payload) => {
  return {
    type: RECEIVE_USER_LOAD_DATA,
    payload,
  };
};

const receivePrivateUserLoadData = (payload) => {
  return {
    type: RECEIVE_PRIVATE_USER_LOAD_DATA,
    payload,
  };
};

export const removeErrors = () => ({ type: REMOVE_ERRORS });



export const register = (user) => (dispatch) => {
  user = convertToSnakeCase(user);
  return SessionAPIUtil.createUser(user).then((currentUser) => (
    dispatch(receiveCurrentUser(currentUser))
  ), (err) => (
    dispatch(receiveSessionErrors(err.responseJSON))
  ));
};

export const login = (user) => (dispatch) => {
  user = convertToSnakeCase(user);
  SessionAPIUtil.login(user).then((currentUser) => (
    dispatch(receiveCurrentUser(currentUser))
  ), (err) => (
    dispatch(receiveSessionErrors(err.responseJSON))
  ));
};

export const logout = () => (dispatch) => {
  SessionAPIUtil.logout().then(() => (
    dispatch(logoutCurrentUser())
  ), (err) => (
    dispatch(receiveSessionErrors(err.responseJSON))
  ));
};

export const _retrieveUserLoadData = (userId) => (dispatch) => {
  return getUserConversations(userId)
    .then((payload) => {
      dispatch(receivePrivateUserLoadData(payload));
    }).then(
      () => {
        getUserServers(userId)
          .then(
            (payload) => dispatch(receiveUserLoadData(payload)),
          );
      },
    );
};