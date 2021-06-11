import { convertToSnakeCase } from "./func_utils";

export const updateMembership = membership => {
  membership = convertToSnakeCase(membership);
  return $.ajax({
      method: "PATCH",
      url: `/api/memberships/${membership.id}`,
      data: { membership },
  })
};