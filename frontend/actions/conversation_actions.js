import { convertToSnakeCase } from "../utils/func_utils";
import * as ConvoAPIUtil from '../utils/conversation_utils';

export const RECEIVE_NEW_CONVERSATION = "RECEIVE_NEW_CONVERSATION";
export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";

export const receiveNewConversation = payload => {
  return {
    type: RECEIVE_NEW_CONVERSATION,
    payload
  };
};

export const receiveConversations = payload => {
  return {
    type: RECEIVE_CONVERSATIONS,
    payload
  };
};
