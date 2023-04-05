import { get } from '@axios';
import { RECEIVE_MESSAGE, RECEIVE_MESSAGES, REMOVE_MESSAGE } from '@constants';
import { buildUrl } from '@helpers';

export const receiveMessages = (messages) => ({ type: RECEIVE_MESSAGES, messages });
export const receiveMessage = (message) => ({ type: RECEIVE_MESSAGE, message });
export const removeMessage = (messageId) => ({ type: REMOVE_MESSAGE, messageId });

export const retrieveChannelMessages = (channelId) => (dispatch) => (
  get({ url: `${buildUrl('channel', channelId)}/messages` })
    .then((messages) => dispatch(receiveMessages(messages)))
);