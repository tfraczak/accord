import { convertToSnakeCase } from "./func_utils";

export const getUserServers = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}/servers`,
    })
);

export const createServer = server => (
    $.ajax({
        method: "POST",
        url: "/api/servers",
        data: { server },
    })
);

export const updateServer = server => (
    $.ajax({
        method: "POST",
        url: `/api/servers/${server.id}`,
        data: { server },
    })
);

export const destroyServer = serverId => (
    $.ajax({
        method: "DELETE",
        url: `/api/servers/${serverId}`,
    })
);

export const joinServer = (membership) => {
    return $.ajax({
        method: "POST",
        url: `/api/memberships`,
        data: { membership }
    })
};

export const leaveServer = (membershipId) => (
    $.ajax({
        method: "DELETE",
        url: `/api/memberships/${membershipId}`,
    })
);

export const createInvite = (serverId, expiration=null) => (
    $.ajax({
        method: "POST",
        url: `/api/servers/${serverId}/invitations`,
        data: { invitation: {expiration} },
    })
);

export const getInvitations = (serverId) => (
    $.ajax({
        method: "GET",
        url: `/api/servers/${serverId}/invitations`,
    })
);

export const destroyInvite = (inviteId) => (
    $.ajax({
        method: "DELETE",
        url: `/api/invitations/${inviteId}`,
    })
);

export const getServerByInvite = urlToken => {
    return $.ajax({
        method: "GET",
        url: `/api/invitations/${urlToken}`,
    })
};