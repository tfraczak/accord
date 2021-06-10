export const getServerMembers = serverId => (
    $.ajax({
        method: "GET",
        url: `/api/servers/${serverId}/users`,
    })
);