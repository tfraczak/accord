import { convertToSnakeCase } from '../utils/func_utils';
import { receiveServerErrors } from './server_actions';
import { RECEIVE_USER_ERRORS } from '../constants';
import * as ChannelAPIUtil from '../utils/channel_utils';
import * as ServerAPIUtil from '../utils/server_utils';
import {
  RECEIVE_CHANNEL,
  RECEIVE_CHANNELS,
  REMOVE_CHANNEL,
  RECEIVE_CREATED_CHANNEL,
  RECEIVE_UPDATED_CHANNEL,
} from '../constants';

export const receiveChannels = (channels) => ({ type: RECEIVE_CHANNELS, channels });
export const receiveChannel = (payload) => ({ type: RECEIVE_CHANNEL, payload });
export const receiveCreatedChannel = (channel) => ({ type: RECEIVE_CREATED_CHANNEL, channel });
export const receiveUpdatedChannel = (payload) => ({ type: RECEIVE_UPDATED_CHANNEL, payload });
export const removeChannel = (channel) => ({ type: REMOVE_CHANNEL, channel });
export const receiveChannelErrors = (errors) => ({ type: RECEIVE_USER_ERRORS, errors });

export const retrieveServerChannels = (serverId) => (dispatch) => (
  ServerAPIUtil.getChannels(serverId)
    .then(
      (payload) => dispatch(receiveChannels(payload)),
      (err) => dispatch(receiveServerErrors(err.responseJSON)),
    )
);

export const retrieveChannel = (channelId) => (dispatch) => (
  ChannelAPIUtil.getChannel(channelId)
    .then(
      (payload) => dispatch(receiveChannel(payload)),
      (err) => dispatch(receiveChannelErrors(err.responseJSON)),
    )
);

export const createChannel = (channel) => (dispatch) => {
  channel = convertToSnakeCase(channel);
  return ChannelAPIUtil.createChannel(channel)
    .then(
      (channel) => dispatch(receiveCreatedChannel(channel)),
    );
};

export const updateChannel = (channel) => (dispatch) => (
  ChannelAPIUtil.updateChannel(channel)
    .then(
      (payload) => dispatch(receiveUpdatedChannel(payload)),
    )
);

export const deleteChannel = (channel) => (dispatch) => {
  return ChannelAPIUtil.destroyChannel(channel.id)
    .then(
      () => dispatch(removeChannel(channel)),
    );
};