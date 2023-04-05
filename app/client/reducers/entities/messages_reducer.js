import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  REMOVE_MESSAGE,
  RECEIVE_SERVERS,
  RECEIVE_SERVER_INFO,
  LEAVE_SERVER,
  REMOVE_SERVER,
  RECEIVE_JOINED_SERVER,
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL,
  RECEIVE_CHANNELS,
  RECEIVE_UPDATED_CHANNEL,
  RECEIVE_USER_LOAD_DATA,
  RECEIVE_PRIVATE_USER_LOAD_DATA,
  LOGOUT_CURRENT_USER,
  RECEIVE_CONVERSATION,
} from '@constants';

import { chatMessages } from '@selectors';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let message, messages, messageId, messageIds;
  switch (action.type) {
  case RECEIVE_MESSAGES:
    return Object.assign({}, state, action.messages);
  case RECEIVE_SERVERS:
    return Object.assign({}, state, action.payload.messages);
  case RECEIVE_USER_LOAD_DATA:
    messages = action.payload.messages;
    return Object.assign({}, state, messages);
  case RECEIVE_SERVER_INFO:
    messages = action.payload.messages;
    return Object.assign({}, state, messages);
  case RECEIVE_MESSAGE:
    return Object.assign({}, state, { [action.message.id]: action.message });
  case REMOVE_MESSAGE:
    nextState = Object.assign({}, state);
    delete nextState[action.messageId];
    return nextState;
  case RECEIVE_CHANNELS:
    messages = action.payload.messages;
    return Object.assign({}, state, messages);
  case RECEIVE_CHANNEL:
    messages = action.payload.messages;
    return Object.assign({}, state, messages);
  case RECEIVE_UPDATED_CHANNEL:
    messages = action.payload.messages;
    return Object.assign({}, state, messages);
  case REMOVE_CHANNEL:
    nextState = Object.assign({}, state);
    messages = chatMessages(action.channel, 'Channel', nextState);
    for(let message of messages) { delete nextState[message.id]; }
    return nextState;
  case RECEIVE_JOINED_SERVER:
    messages = action.payload.messages;
    return Object.assign({}, state, messages);
  case LEAVE_SERVER:
    nextState = Object.assign({}, state);
    messageIds = Object.values(action.payload.messageIds);
    for(let id of messageIds) { delete nextState[id]; }
    return nextState;
  case REMOVE_SERVER:
    nextState = Object.assign({}, state);
    messageIds = Object.values(action.payload.messageIds);
    for(let id of messageIds) { delete nextState[id]; }
    return nextState;
  case RECEIVE_PRIVATE_USER_LOAD_DATA:
    return Object.assign({}, state, action.payload.messages);
  case RECEIVE_CONVERSATION:
    return Object.assign({}, state, action.payload.messages);
  case LOGOUT_CURRENT_USER:
    return {};
  default:
    return state;
  }
};