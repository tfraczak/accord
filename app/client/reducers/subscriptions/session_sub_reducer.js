import { LOGOUT_CURRENT_USER, RECEIVE_SESSION_SUB } from '@constants';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let sessionSub;
  switch (action.type) {
  case RECEIVE_SESSION_SUB:
    sessionSub = action.sessionSub;
    nextState = Object.assign({}, state, sessionSub);
    return nextState;
  case LOGOUT_CURRENT_USER:
    return {};
  default:
    return state;
  }
};