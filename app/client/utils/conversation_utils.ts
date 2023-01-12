import { get, patch, post } from './axios';
import { buildUrl } from '../helpers';

export const getUserConversations = (userId) => get({ url: `${buildUrl('user', userId)}/conversations` });
export const createConversation = (conversation) => (
  post({ url: `${buildUrl('user', conversation.receiverId)}/conversations`, data: { conversation } })
);
export const updateConversation = (conversation) => patch({
  url: buildUrl('conversations', conversation.id),
  data: { conversation },
});
export const getConversation = (convoId) => get({ url: buildUrl('conversation', convoId) });