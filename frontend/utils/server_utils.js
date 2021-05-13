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

export const joinServer = (membership) => (
    $.ajax({
        method: "POST",
        url: `/api/memberships`,
        data: { membership }
    })
);

export const leaveServer = (membershipId) => (
    $.ajax({
        method: "DELETE",
        url: `/api/memberships/${membershipId}`,
    })
);