import {
  destroy,
  get,
  patch,
  post,
} from './axios';
import { buildUrl } from '../helpers';

export const getServerChannels = (serverId) => get({ url: `${buildUrl('server', serverId)}/channels` });
export const getChannel = (channelId) => get({ url: buildUrl('channel', channelId) });
export const createChannel = (channel) => post({ url: buildUrl('channel', channel.id), data: { channel } });
export const updateChannel = (channel) => patch({ url: buildUrl('channel', channel.id), data: { channel } });
export const destroyChannel = (channelId) => destroy({ url: buildUrl('channel', channelId) });