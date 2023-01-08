import * as ConvoAPIUtil from '../utils/conversation_utils';
import {
  RECEIVE_NEW_CONVERSATION,
  RECEIVE_CONVERSATIONS,
  RECEIVE_CONVERSATION,
  REMOVE_CREATED_CONVO,
} from '../constants';

export const receiveNewConversation = (payload) => ({ type: RECEIVE_NEW_CONVERSATION, payload });
export const receiveConversations = (payload) => ({ type: RECEIVE_CONVERSATIONS, payload });
export const receiveConversation = (payload) => ({ type: RECEIVE_CONVERSATION, payload });
export const removeCreatedConvo = () => ({ type: REMOVE_CREATED_CONVO });

export const createConversation = (conversation) => (dispatch) => {
  return ConvoAPIUtil.createConversation(conversation)
    .then(
      (payload) => payload.messages ? dispatch(receiveConversation(payload)) : dispatch(receiveNewConversation(payload)),
    );
};

export const retrieveConversation = (convoId) => (dispatch) => {
  return ConvoAPIUtil.getConversation(convoId)
    .then((payload) => dispatch(receiveConversation(payload)));
};
