export const RECEIVE_CHAT_SUB = "RECEIVE_CHAT_SUB";
export const RECEIVE_CHAT_SUBS = "RECEIVE_CHAT_SUBS";
export const REMOVE_CHAT_SUBS = "REMOVE_CHAT_SUBS";
export const RECEIVE_SERVER_SUB = "RECEIVE_SERVER_SUB";
export const REMOVE_SERVER_SUBS = "REMOVE_SERVER_SUBS";
export const REMOVE_SERVER_SUB = "REMOVE_SERVER_SUB";

export const receiveChatSub = chat => { // chat should look like { id: chat.id, sub: chatSub }
  return {
    type: RECEIVE_CHAT_SUB,
    chat,
  };
};

export const receiveChatSubs = chats => { // same for each element in chats
  return {
    type: RECEIVE_CHAT_SUBS,
    chats
  };
};

export const removeChatSubs = () => {
  return {
    type: REMOVE_CHAT_SUBS
  };
};

export const receiveServerSub = server => { // server should look like { id: server.id, sub: serverSub }
  return {
    type: RECEIVE_SERVER_SUB,
    server,
  };
};

export const removeServerSubs = () => {
  return {
    type: REMOVE_SERVER_SUBS
  };
};

export const removeServerSub = serverId => {
  return {
    type: REMOVE_SERVER_SUBS,
    serverId
  };
};
