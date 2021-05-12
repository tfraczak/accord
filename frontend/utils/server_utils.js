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

port const updateServer = server => (
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