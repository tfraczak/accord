export const REMOVE_ERRORS: 'REMOVE_ERRORS' = 'REMOVE_ERRORS';
export type MISC_ACTION_TYPES = (
  typeof REMOVE_ERRORS
);
export const DEFAULT_STATE = {
  entities: {
    channels: {},
    conversations: {},
    invitations: {},
    memberships: {},
    messages: {},
    servers: {},
    users: {},
  },
  errors: { server: [], session: [], users: [] },
  session: null,
  subscriptions: { server: {}, session: {} },
  ui: { modal: null },
};