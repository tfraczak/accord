import {
  REMOVE_ERRORS,
  RECEIVE_USERS,
  RECEIVE_USER_ERRORS,
  LOGOUT_CURRENT_USER,
} from '@constants';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
  case RECEIVE_USER_ERRORS:
    return action.errors;
  case RECEIVE_USERS:
    return [];
  case REMOVE_ERRORS:
    return [];
  case LOGOUT_CURRENT_USER:
    return [];
  default:
    return state;
  }
};