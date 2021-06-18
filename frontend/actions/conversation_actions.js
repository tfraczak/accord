import { convertToSnakeCase } from "../utils/func_utils";
import * as ConvoAPIUtil from '../utils/conversation_utils';

export const RECEIVE_NEW_CONVERSATION = "RECEIVE_NEW_CONVERSATION";
export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION";
export const REMOVE_CREATED_CONVO = "REMOVE_CREATED_CONVO";

export const receiveNewConversation = payload => {
  return {
    type: RECEIVE_NEW_CONVERSATION,
    payload,
  };
};

export const receiveConversations = payload => {
  return {
    type: RECEIVE_CONVERSATIONS,
    payload
  };
};

export const receiveConversation = payload => {
  return {
    type: RECEIVE_CONVERSATION,
    payload
  };
};

export const removeCreatedConvo = () => {
  return {
    type: REMOVE_CREATED_CONVO
  };
};

export const createConversation = conversation => dispatch => {
  return ConvoAPIUtil.createConversation(conversation)
    .then(
      payload => {
        if (payload.messages) {
          return dispatch(receiveConversation(payload))
        } else {
          return dispatch(receiveNewConversation(payload))
        }
      }
    );
};

export const retrieveConversation = convoId => dispatch => {
  return ConvoAPIUtil.getConversation(convoId)
    .then(
      payload => {
        return dispatch(receiveConversation(payload));
      }
    );
};
