import { RECEIVE_SERVER_SUB } from '../../actions/socket_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let server, serverSub;
  switch (action.type) {
    case RECEIVE_SERVER_SUB:
      server = action.payload.server;
      serverSub = action.payload.serverSub;
      nextState = Object.assign({}, state, { [server.id]: serverSub });
      return nextState;
    default:
      return state;
  }
};