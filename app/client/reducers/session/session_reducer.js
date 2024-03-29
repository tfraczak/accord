import {
  REMOVE_INVITATION,
  RECEIVE_INVITATION,
  RECEIVE_INVITED_SERVER,
  LOGOUT_CURRENT_USER,
  RECEIVE_CONVERSATION,
  RECEIVE_CURRENT_USER,
  RECEIVE_NEW_CONVERSATION,
  REMOVE_CREATED_CONVO,
  RECEIVE_SESSION_ERRORS,
} from '@constants';

const _nullSession = Object.freeze({ id: null });

export default (state = _nullSession, action) => {
  Object.freeze(state);
  let nextState;
  switch (action.type) {
  case RECEIVE_CURRENT_USER:
    return { id: action.currentUser.id };
  case LOGOUT_CURRENT_USER:
    return _nullSession;
  case RECEIVE_INVITED_SERVER:
    return Object.assign({}, state, { invitedServer: action.server });
  case RECEIVE_INVITATION:
    return Object.assign({}, state, { invitation: action.invitation });
  case REMOVE_INVITATION:
    nextState = Object.assign({}, state);
    delete nextState['invitation'];
    return nextState;
  case RECEIVE_NEW_CONVERSATION:
    return Object.assign({}, state, { conversation: action.payload.conversation });
  case REMOVE_CREATED_CONVO:
    nextState = Object.assign({}, state);
    delete nextState['conversation'];
    return nextState;
  case RECEIVE_CONVERSATION:
    return Object.assign({}, state, { conversation: action.payload.conversation });
  default:
    return state;
  }
};