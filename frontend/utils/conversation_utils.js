import { convertToSnakeCase } from "./func_utils";

export const getUserConversations = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}/conversations`,
    })
);

export const createConversation = convo => {
    const conversation = convertToSnakeCase(convo);
    return $.ajax({
        method: "POST",
        url: `/api/users/${convo.receiverId}/conversations`,
        data: { conversation },
    });
};

export const updateConversation = conversation => {
    return $.ajax({
        method: "PATCH",
        url: `/api/conversations/${conversation.id}`,
        data: { conversation },
    })
};

export const getConversation = convoId => {
    return $.ajax({
        method: "GET",
        url: `/api/conversations/${convoId}`,
    });
};