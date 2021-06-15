export const RECEIVE_CHAT_SUB = "RECEIVE_CHAT_SUB";
export const RECEIVE_SERVER_SUB = "RECEIVE_SERVER_SUB";

export const receiveChatSub = chatSub => {
  return {
    type: RECEIVE_CHAT_SUB,
    chatSub,
  };
};

export const receiveServerSub = payload => {
  return {
    type: RECEIVE_SERVER_SUB,
    payload,
  };
};