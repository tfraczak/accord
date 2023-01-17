import * as axios from '@axios';
import { buildUrl } from '../helpers';
import {
  RECEIVE_NEW_CONVERSATION,
  RECEIVE_CONVERSATIONS,
  RECEIVE_CONVERSATION,
  REMOVE_CREATED_CONVO,
} from '../constants';

const url = (id = null) => buildUrl('conversation', id);

export const receiveNewConversation = (payload) => ({ type: RECEIVE_NEW_CONVERSATION, payload });
export const receiveConversations = (payload) => ({ type: RECEIVE_CONVERSATIONS, payload });
export const receiveConversation = (payload) => ({ type: RECEIVE_CONVERSATION, payload });
export const removeCreatedConvo = () => ({ type: REMOVE_CREATED_CONVO });

export const createConversation = (conversation) => (dispatch) => {
  return axios.post({ url: url(), data: { conversation } })
    .then(
      (payload) => payload.messages ? dispatch(receiveConversation(payload)) : dispatch(receiveNewConversation(payload)),
    );
};

export const retrieveConversation = (convoId) => (dispatch) => {
  return axios.get({ url: url(convoId) })
    .then((payload) => dispatch(receiveConversation(payload)));
};
