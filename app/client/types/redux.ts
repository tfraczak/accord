import { Subscriptions } from 'actioncable';
import {
  CHANNEL_ACTION_TYPES,
  CONVERSATION_ACTION_TYPES,
  INVITATION_ACTION_TYPES,
  MEMBERSHIP_ACTION_TYPES,
  MESSAGE_ACTION_TYPES,
  MISC_ACTION_TYPES,
  SERVER_ACTION_TYPES,
  SESSION_ACTION_TYPES,
  SOCKET_ACTION_TYPES,
  UI_ACTION_TYPES,
  USER_ACTION_TYPES,
} from '@constants';
import { Channel } from './channel';
import { Conversation } from './conversation';
import { Invitation } from './invitation';
import { Membership } from './membership';
import { Message } from './message';
import { Server } from './server';
import { User } from './user';

export type EntitiesState = {
  channels?: { [key: number]: Channel },
  conversations?: { [key: number]: Conversation },
  invitations?: { [key: number]: Invitation },
  memberships?: { [key: number]: Membership },
  messages?: { [key: number]: Message },
  servers?: { [key: number]: Server },
  users?: { [key: number]: User },
};
export type ErrorsState = { server: string[], session: string[], users: string[] };
export type SessionState = null | { id: number };
export type SubscriptionsState = {
  server: { [key: number]: Subscriptions },
  session: { [key: number]: Subscriptions },
};
export type UIState = { modal: null | string };

export type ReduxState = {
  entities: EntitiesState,
  errors?: ErrorsState,
  session?: SessionState,
  subscriptions?: SubscriptionsState,
  ui?: UIState,
};

export type Action = {
  type: (
    CHANNEL_ACTION_TYPES |
    CONVERSATION_ACTION_TYPES |
    INVITATION_ACTION_TYPES |
    MEMBERSHIP_ACTION_TYPES |
    MESSAGE_ACTION_TYPES |
    MISC_ACTION_TYPES |
    SERVER_ACTION_TYPES |
    SESSION_ACTION_TYPES |
    SOCKET_ACTION_TYPES |
    UI_ACTION_TYPES |
    USER_ACTION_TYPES
  ),
  payload: {},
}