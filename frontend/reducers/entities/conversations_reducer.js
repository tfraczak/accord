import {
  RECEIVE_NEW_CONVERSATION,
} from "../../actions/conversation_actions";

import { RECEIVE_PRIVATE_USER_LOAD_DATA } from "../../actions/session_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let conversation, conversations, conversationId, conversationIds;
  switch (action.type) {
    case RECEIVE_NEW_CONVERSATION:
      nextState = Object.assign({}, state);
      conversation = action.payload.conversation;
      nextState[conversation.id] = conversation;
      return nextState;
    case RECEIVE_PRIVATE_USER_LOAD_DATA:
      nextState = Object.assign({}, state, action.payload.conversations);
      return nextState;
    default:
      return state;
  }
};