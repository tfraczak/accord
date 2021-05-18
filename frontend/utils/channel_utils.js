import { convertToSnakeCase } from "./func_utils";

export const getServerChannels = serverId => (
    $.ajax({
        method: "GET",
        url: `/api/servers/${serverId}/channels`,
    })
);

export const createChannel = channel => {
    channel = convertToSnakeCase(channel);
    return $.ajax({
        method: "POST",
        url: "/api/channels",
        data: { channel },
    })
};

export const updateChannel = channel => {
    channel = convertToSnakeCase(channel);
    return $.ajax({
        method: "POST",
        url: `/api/channels/${channel.id}`,
        data: { channel },
    })
};

export const destroyChannel = channelId => (
    $.ajax({
        method: "DELETE",
        url: `/api/channels/${channelId}`,
    })
);