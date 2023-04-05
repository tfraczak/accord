import {
  get,
  post,
  patch,
  destroy,
} from '@axios';
import {
  RECEIVE_CHANNEL,
  RECEIVE_CHANNELS,
  REMOVE_CHANNEL,
  RECEIVE_CREATED_CHANNEL,
  RECEIVE_UPDATED_CHANNEL,
  RECEIVE_USER_ERRORS,
} from '@constants';
import { buildUrl } from '@helpers';
import { receiveServerErrors } from './server_actions';

const url = (id: number | null = null): string => buildUrl('channel', id);

export const receiveChannels = (channels) => ({ type: RECEIVE_CHANNELS, channels });
export const receiveChannel = (payload) => ({ type: RECEIVE_CHANNEL, payload });
export const receiveCreatedChannel = (channel) => ({ type: RECEIVE_CREATED_CHANNEL, channel });
export const receiveUpdatedChannel = (payload) => ({ type: RECEIVE_UPDATED_CHANNEL, payload });
export const removeChannel = (channel) => ({ type: REMOVE_CHANNEL, channel });
export const receiveChannelErrors = (errors) => ({ type: RECEIVE_USER_ERRORS, errors });

export const retrieveServerChannels = (serverId) => (dispatch) => (
  get({ url: `${buildUrl('server', serverId)}/channels` })
    .then(
      (payload) => dispatch(receiveChannels(payload)),
      (err) => dispatch(receiveServerErrors(err.data)),
    )
);

export const retrieveChannel = (channelId) => (dispatch) => (
  get({ url: url(channelId) })
    .then(
      (payload) => dispatch(receiveChannel(payload)),
      (err) => dispatch(receiveChannelErrors(err.data)),
    )
);

export const createChannel = (channel) => (dispatch) => (
  post({ url: url(), data: { channel } })
    .then(
      (channel) => dispatch(receiveCreatedChannel(channel)),
      (err) => receiveChannelErrors(err.data),
    )
);

export const updateChannel = (channel) => (dispatch) => (
  patch({ url: url(channel.id), data: { channel } })
    .then((payload) => dispatch(receiveUpdatedChannel(payload)))
);

export const deleteChannel = (channel) => (dispatch) => (
  destroy({ url: url(channel.id) })
    .then(() => dispatch(removeChannel(channel)))
);