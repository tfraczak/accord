import { convertToSnakeCase } from '../utils/func_utils';
import { receiveServerErrors } from './server_actions';
import { RECEIVE_USER_ERRORS } from './user_actions';
import * as ChannelAPIUtil from '../utils/channel_utils';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const RECEIVE_CREATED_CHANNEL = "RECEIVE_CREATED_CHANNEL";
export const RECEIVE_UPDATED_CHANNEL = "RECEIVE_UPDATED_CHANNEL";

export const receiveChannels = channels => ({
    type: RECEIVE_CHANNELS,
    channels,
});

export const receiveChannel = payload => ({
    type: RECEIVE_CHANNEL,
    payload,
});

export const receiveCreatedChannel = channel => ({
    type: RECEIVE_CREATED_CHANNEL,
    channel,
});

export const receiveUpdatedChannel = payload => ({
    type: RECEIVE_UPDATED_CHANNEL,
    payload,
});

export const removeChannel = channel => ({
    type: REMOVE_CHANNEL,
    channel,
});

export const recveiveChannelErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors,
});

export const retrieveServerChannels = serverId => dispatch => (
    ServerAPIUtil.getChannels(serverId)
        .then(
            payload => dispatch(receiveChannels(payload)),
            err => dispatch(receiveServerErrors(err.responseJSON))
        )
);

export const retrieveChannel = channelId => dispatch => (
    ChannelAPIUtil.getChannel(channelId)
        .then(
            payload => dispatch(receiveChannel(payload)),
            err => dispatch(receiveChannelErrors(err.responseJSON))
        )
);

export const createChannel = channel => dispatch => {
    channel = convertToSnakeCase(channel);
    return ChannelAPIUtil.createChannel(channel)
        .then(
            channel => dispatch(receiveCreatedChannel(channel))
        );
};

export const updateChannel = channel => dispatch => (
    ChannelAPIUtil.updateChannel(channel)
        .then(
            payload => dispatch(receiveUpdatedChannel(payload))
        )
);

export const deleteChannel = channel => dispatch => {
    return ChannelAPIUtil.destroyChannel(channel.id)
        .then(
            () => dispatch(removeChannel(channel))
        );
};