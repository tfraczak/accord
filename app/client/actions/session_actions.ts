import * as axios from '@axios';
import {
  LOGOUT_CURRENT_USER,
  RECEIVE_CURRENT_USER,
  REMOVE_ERRORS,
  RECEIVE_SESSION_ERRORS,
  RECEIVE_USER_LOAD_DATA,
  RECEIVE_PRIVATE_USER_LOAD_DATA,
} from '@constants';
import { buildUrl } from '@helpers';

const usersUrl = (id: number | null = null): string => buildUrl('user', id);
const sessionUrl = (id: number | null = null): string => buildUrl('session', id);

const receiveCurrentUser = (currentUser) => ({ type: RECEIVE_CURRENT_USER, currentUser });
const logoutCurrentUser = () => ({ type: LOGOUT_CURRENT_USER });
const receiveSessionErrors = (errors) => ({ type: RECEIVE_SESSION_ERRORS, errors });
const receiveUserLoadData = (payload) => ({ type: RECEIVE_USER_LOAD_DATA, payload });
const receivePrivateUserLoadData = (payload) => ({ type: RECEIVE_PRIVATE_USER_LOAD_DATA, payload });
export const removeErrors = () => ({ type: REMOVE_ERRORS });

export const register = (user) => (dispatch) => (
  axios.post({ url: usersUrl(), data: { user } })
    .then(
      (currentUser) => {
        dispatch(receiveCurrentUser(currentUser))
      },
      (err) => {
        dispatch(receiveSessionErrors(err.response.data))
      },
    )
);

export const login = (user) => (dispatch) => {
  return axios.post({ url: sessionUrl(), data: { user } })
    .then(
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (err) => dispatch(receiveSessionErrors(err.response.data)),
    );
};

export const logout = () => (dispatch) => (
  axios.destroy({ url: sessionUrl() })
    .then(
      () => {
        dispatch(logoutCurrentUser())
      },
      (err) => {
        dispatch(receiveSessionErrors(err.response.data))
      },
    )
);

export const _retrieveUserLoadData = (userId) => (dispatch) => (
  axios.get({ url: `${usersUrl(userId)}/conversations` })
    .then((payload) => dispatch(receivePrivateUserLoadData(payload)))
    .then(
      () => (
        axios.get({ url: `${usersUrl(userId)}/servers` })
          .then((payload) => dispatch(receiveUserLoadData(payload)))
      ),
    )
);