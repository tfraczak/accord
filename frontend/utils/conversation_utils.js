export const getUserConversations = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}/conversations`,
    })
);

export const createConversation = conversation => {
    return $.ajax({
        method: "POST",
        url: "/api/conversations",
        data: { conversation },
    })
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