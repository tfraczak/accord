import { RECEIVE_SESSION_SUB } from "../../actions/socket_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let sessionSub;
  switch (action.type) {
    case RECEIVE_SESSION_SUB:
      sessionSub = action.sessionSub;
      nextState = Object.assign({}, state, sessionSub);
      return nextState;
    default:
      return state;
  }
};