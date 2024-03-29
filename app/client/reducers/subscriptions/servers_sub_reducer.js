import {
  RECEIVE_SERVER_SUB,
  REMOVE_SERVER_SUBS,
  LOGOUT_CURRENT_USER,
  REMOVE_SERVER,
} from '@constants';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let id, serverSub, serverSubs;
  switch (action.type) {
  case RECEIVE_SERVER_SUB:
    id = action.server.id;
    serverSub = action.server.sub;
    nextState = Object.assign({}, state, { [id]: serverSub });
    return nextState;
  case REMOVE_SERVER_SUBS:
    return {};
  case REMOVE_SERVER:
    nextState = Object.assign({}, state);
    delete nextState[action.serverId];
    return nextState;
  case LOGOUT_CURRENT_USER:
    serverSubs = Object.values(state);
    if (serverSubs.length) {
      for (let sub of serverSubs) { sub.unsubscribe(sub); }
    }
    return {};
  default:
    return state;
  }
};