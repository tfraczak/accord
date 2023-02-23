import {
  receiveServer,
  receiveServerErrors,
  leftServer,
  removeServer,
} from '../actions/server_actions';
import { receiveNewMember } from '../actions/user_actions';
import { receiveConversation } from '../actions/conversation_actions';
import { socketInvitation, receiveInvitation } from '../actions/invitation_actions';
import { receiveCreatedChannel, receiveUpdatedChannel, removeChannel } from '../actions/channel_actions';
import { removeMembership, receiveMembership } from '../actions/membership_actions';
import { receiveMessage, receiveMessages, removeMessage } from '../actions/message_actions';


export const createServerSub = (server, currentUserId, dispatch) => (
  globalThis.App.cable.subscriptions.create(
    { channel: 'ServerChannel', serverId: server.id },
    {
      received: (data) => {
        switch (data.action) {
        case 'new member': return dispatch(receiveNewMember(data.payload));
        case 'kick member': {
          if (!data.error) {
            if (currentUserId === data.payload.userId) {
              return dispatch(leftServer(data.payload));
            } else {
              return dispatch(removeMembership(data.payload.membershipId));
            }
          } else {
            if (data.payload.currentUserId === currentUserId) {
              return dispatch(receiveServerErrors(data.error));
            }
          }
          return;
        }
        case 'leave server': {
          if (!data.error) {
            if (currentUserId === data.payload.userId) {
              return dispatch(leftServer(data.payload));
            } else {
              return dispatch(removeMembership(data.payload.membershipId));
            }
          } else {
            if (data.payload.userId === currentUserId) {
              return dispatch(receiveServerErrors(data.error));
            }
          }
          return;
        }
        case 'delete server': return dispatch(removeServer(data.payload));
        case 'update server': return dispatch(receiveServer(data.server));
        case 'update nickname': return dispatch(receiveMembership(data.membership));
        case 'new channel': return dispatch(receiveCreatedChannel(data.channel));
        case 'update channel': return dispatch(receiveUpdatedChannel(data.payload));
        case 'delete channel': return dispatch(removeChannel(data.channel));
        case 'create invite': {
          const inviterId = data.invite.inviter.id;
          const action = currentUserId === inviterId ? receiveInvitation : socketInvitation;
          action(data.invite);
        }
        default: return;
        }
      },
      updateServer: (data, sub) => sub.perform('update_server', data),
      kickMember: (data, sub) => sub.perform('kick_member', data),
      leaveServer: (data, sub) => sub.perform('leave_server', data),
      deleteServer: (sub) => sub.perform('delete_server'),
      newChannel: (data, sub) => sub.perform('new_channel', data),
      updateChannel: (data, sub) => sub.perform('update_channel', data),
      deleteChannel: (data, sub) => sub.perform('delete_channel', data),
      updateNickname: (data, sub) => sub.perform('update_nickname', data),
      createInvite: (data, sub) => sub.perform('create_invite', data),
      unsubscribe: (sub) => sub.perform('unsubscribed'),
    },
  )
);

export const createChatSub = (context, type, dispatch) => (
  globalThis.App.cable.subscriptions.create(
    { channel: 'ChatChannel', type, chatId: context.props.chat.id },
    {
      received: (data) => {
        let messages;
        switch (data.action) {
        case 'load': return dispatch(receiveMessages(data.messages));
        case 'new message': {
          dispatch(receiveMessage(data.message));
          context.setState({ messages: context.state.messages.concat(data.message) });
          return;
        }
        case 'update message': {
          dispatch(receiveMessage(data.message));
          messages = {};
          context.state.messages.forEach((message) => messages[message.id] = message);
          messages[data.message.id] = data.message;
          context.setState({ messages: Object.values(messages) });
          return;
        }
        case 'delete message': {
          dispatch(removeMessage(data.messageId));
          messages = {};
          context.state.messages.forEach((message) => messages[message.id] = message);
          delete messages[data.messageId];
          context.setState({ messages: Object.values(messages) });
          return;
        }
        default: return;
        }
      },
      speak: (data) => context.subscription.perform('speak', data),
      update: (data) => context.subscription.perform('update', data),
      delete: (data) => context.subscription.perform('destroy', data),
      unsubscribe: () => context.subscription.perform('unsubscribed'),
      load: () => context.subscription.perform('load'),
    },
  )
);

export const createSessionSub = (currentUserId, dispatch) => (
  globalThis.App.cable.subscriptions.create(
    { channel: 'SessionChannel', currentUserId },
    {
      received: (data) => {
        switch (data.action) {
        case 'initiate conversation': return dispatch(receiveConversation(data.payload));
        case 'new conversation member': return dispatch(receiveNewMember(data.payload));
        case 'remove_server': return dispatch(removeServer(data.payload));
        default: return;
        }
      },
      newConvo: (data, sub) => sub.perform('new_convo', data),
      unsubscribe: (sub) => sub.perform('unsubscribed'),
    },
  )
);