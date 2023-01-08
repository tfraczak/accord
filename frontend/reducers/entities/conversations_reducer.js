import { RECEIVE_NEW_CONVERSATION, RECEIVE_CONVERSATION } from '../../constants';
import { RECEIVE_PRIVATE_USER_LOAD_DATA, LOGOUT_CURRENT_USER } from '../../actions/session_actions';

export default (state = {}, action) => {
  let conversation, conversations, conversationId, conversationIds;
  const nextState = { ...Object.freeze(state) };
  switch (action.type) {
  case RECEIVE_CONVERSATION:
    nextState = { ...state };
    conversation = action.payload.conversation;
    nextState[conversation.id] = conversation;
    return nextState;
  case RECEIVE_NEW_CONVERSATION:
    nextState = { ...state };
    conversation = action.payload.conversation;
    nextState[conversation.id] = conversation;
    return nextState;
  case RECEIVE_PRIVATE_USER_LOAD_DATA:
    return { ...nextState, ...action.payload.conversations };
  case LOGOUT_CURRENT_USER:
    return {};
  default:
    return state;
  }
};