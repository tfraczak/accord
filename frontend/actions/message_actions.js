import * as MessageAPIUtil from '../utils/message_utils';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

export const receiveMessages = messages => ({
    type: RECEIVE_MESSAGES,
    messages,
});

export const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message,
});

export const removeMessage = messageId => ({
    type: REMOVE_MESSAGE,
    messageId,
});

export const retrieveChannelMessages = channelId => dispatch => {
    return MessageAPIUtil.getChannelMessages(channelId)
        .then(messages => {
            dispatch(receiveMessages(messages));
        });
}