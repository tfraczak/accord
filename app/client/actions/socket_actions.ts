import {
  RECEIVE_CHAT_SUB,
  RECEIVE_CHAT_SUBS,
  REMOVE_CHAT_SUBS,
  RECEIVE_SERVER_SUB,
  REMOVE_SERVER_SUBS,
  REMOVE_SERVER_SUB,
  RECEIVE_SESSION_SUB,
} from '@constants';

// chat should look like { id: chat.id, sub: chatSub }
export const receiveChatSub = (chat) => ({ type: RECEIVE_CHAT_SUB, chat });
export const receiveChatSubs = (chats) => ({ type: RECEIVE_CHAT_SUBS, chats });
export const removeChatSubs = () => ({ type: REMOVE_CHAT_SUBS });
export const receiveServerSub = (server) => ({ type: RECEIVE_SERVER_SUB, server });
export const removeServerSubs = () => ({ type: REMOVE_SERVER_SUBS });
export const removeServerSub = (serverId) => ({ type: REMOVE_SERVER_SUBS, serverId });
export const receiveSessionSub = (sessionSub) => ({ type: RECEIVE_SESSION_SUB, sessionSub });
