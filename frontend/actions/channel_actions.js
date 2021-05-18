import { receiveServerErrors } from './server_actions';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

export const receiveChannels = channels => ({
    type: RECEIVE_CHANNELS,
    channels,
});

export const receiveChannel = channel => ({
    type: RECEIVE_CHANNEL,
    channel,
});

export const removeChannel = channelId => ({
    type: REMOVE_CHANNEL,
    channelId,
});

export const retrieveServerChannels = serverId => dispatch => {
    ServerAPIUtil.getChannels(serverId).then(channels => {
        dispatch(receiveChannels(channels));
    }, err => {
        dispatch(receiveServerErrors(err.responseJSON));
    });
};