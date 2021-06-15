import { RECEIVE_SERVER_SUB, REMOVE_SERVER_SUBS } from '../../actions/socket_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let id, serverSub;
  switch (action.type) {
    case RECEIVE_SERVER_SUB:
      id = action.server.id;
      serverSub = action.server.sub;
      nextState = Object.assign({}, state, { [id]: serverSub });
      return nextState;
    case REMOVE_SERVER_SUBS:
      return {};
    default:
      return state;
  }
};