import { convertToSnakeCase } from "./func_utils";

export const getChannelMessages = channelId => {
    return $.ajax({
        method: "GET",
        url: `/api/channels/${channelId}/messages`,
    });
};

export const createMessage = message => {
    message = convertToSnakeCase(message);
    return $.ajax({
        method: "POST",
        url: `/api/messages`,
        data: { message }
    });
};