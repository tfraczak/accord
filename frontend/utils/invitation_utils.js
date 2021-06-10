export const createInvite = (serverId, expiration=null) => (
  $.ajax({
      method: "POST",
      url: `/api/servers/${serverId}/invitations`,
      data: { invitation: {expiration} },
  })
);

export const getServerInvites = serverId => (
  $.ajax({
      method: "GET",
      url: `/api/servers/${serverId}/invitations`,
  })
);

export const destroyInvite = inviteId => (
  $.ajax({
      method: "DELETE",
      url: `/api/invitations/${inviteId}`,
  })
);