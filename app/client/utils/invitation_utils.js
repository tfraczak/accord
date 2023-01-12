import { convertToSnakeCase } from "./func_utils";

export const createInvite = (invitation) => {
  invitation = convertToSnakeCase(invitation);
  return $.ajax({
      method: "POST",
      url: `/api/invitations`,
      data: { invitation },
  })
};

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