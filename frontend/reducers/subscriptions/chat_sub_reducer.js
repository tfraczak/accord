import {
  RECEIVE_CHAT_SUB,
  RECEIVE_CHAT_SUBS,
  REMOVE_CHAT_SUBS,
} from '../../actions/socket_actions';

import {
  LOGOUT_CURRENT_USER
} from '../../actions/session_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let chatSub, chatSubs;
  let chats;
  switch (action.type) {
    case RECEIVE_CHAT_SUB:
      nextState = Object.assign({}, state);
      nextState[action.chat.id] = action.chat.sub;
      return nextState;
    case RECEIVE_CHAT_SUBS:
      chatSubs = Object.values(state);
      for (let chatSub of chatSubs) { chatSub.unsubscribe() }
      nextState = {};
      chats = action.payload.chats;
      for (let chat of chats) { nextState[chat.id] = chat.sub }
      return nextState
    case REMOVE_CHAT_SUBS:
      return {};
    case LOGOUT_CURRENT_USER:
      chatSubs = Object.values(state);
      if (chatSubs.length) {
        for (let sub of chatSubs) { sub.unsubscribe(sub) }
      }
      return {};
    default:
      return state;
  }
};