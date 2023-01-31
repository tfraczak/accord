import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS,
  LOGOUT_CURRENT_USER,
  REMOVE_ERRORS,
} from '@constants';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
  case RECEIVE_SESSION_ERRORS:
    return action.errors;
  case RECEIVE_CURRENT_USER:
    return [];
  case REMOVE_ERRORS:
    return [];
  case LOGOUT_CURRENT_USER:
    return [];
  default:
    return state;
  }
};