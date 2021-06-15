import { RECEIVE_CHAT_SUB } from '../../actions/socket_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState;
  let chat, chatId;
  switch (action.type) {
    case RECEIVE_CHAT_SUB:
      nextState = Object.assign({}, state);
      nextState = action.chatSub;
      return nextState;
    default:
      return state;
  }
};