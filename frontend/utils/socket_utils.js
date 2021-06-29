import {
    removeServerSub,
} from '../actions/socket_actions';

import {
    receiveServer,
    receiveServerErrors,
    leftServer,
    removeServer,
} from '../actions/server_actions';

import {
    receiveNewMember
} from '../actions/user_actions';

import {
    receiveConversation
} from '../actions/conversation_actions';

import {
    socketInvitation,
    receiveInvitation,
} from '../actions/invitation_actions';

import {
    receiveCreatedChannel,
    receiveUpdatedChannel,
    removeChannel,
} from '../actions/channel_actions';

import {
    removeMembership,
    receiveMembership,
} from '../actions/membership_actions';

import {
    receiveMessage,
    receiveMessages,
    removeMessage,
} from '../actions/message_actions';


export const createServerSub = (
    server,
    currentUserId,
    dispatch,
) => (
    App.cable.subscriptions.create(
        {
            channel: `ServerChannel`,
            serverId: server.id,
        },
        {
            received: data => {
                switch (data.action) {
                    case "new member":
                        dispatch(receiveNewMember(data.payload));
                        break;
                    case "kick member":
                        if (!data.error) {
                            if (currentUserId === data.payload.userId) {
                                dispatch(leftServer(data.payload));
                            } else {
                                dispatch(removeMembership(data.payload.membershipId));
                            }
                        } else {
                            if (data.payload.currentUserId === currentUserId) {
                                dispatch(receiveServerErrors(data.error));
                            }
                        }
                        break;
                    case "leave server":
                        if (!data.error) {
                            if (currentUserId === data.payload.userId) {
                                dispatch(leftServer(data.payload));
                            } else {
                                dispatch(removeMembership(data.payload.membershipId));
                            }
                        } else {
                            if (data.payload.userId === currentUserId) {
                                dispatch(receiveServerErrors(data.error));
                            }
                        }
                        break;
                    case "delete server":
                        dispatch(removeServer(data.payload));
                        break;
                    case "update server":
                        dispatch(receiveServer(data.server));
                        break;
                    case "update nickname":
                        dispatch(receiveMembership(data.membership));
                        break;
                    case "new channel":
                        dispatch(receiveCreatedChannel(data.channel));
                        break;
                    case "update channel":
                        dispatch(receiveUpdatedChannel(data.payload));
                        break;
                    case "delete channel":
                        dispatch(removeChannel(data.channel));
                        break;
                    case "delete channel":
                        dispatch(removeChannel(data.channel));
                        break;
                    case "create invite":
                        const inviterId = data.invite.inviter.id;
                        if (currentUserId === inviterId) {
                            dispatch(receiveInvitation(data.invite));
                        } else {
                            dispatch(socketInvitation(data.invite));
                        }
                        break;
                    default:
                        break;
                }
            },
            updateServer: (data, sub) => {
                return sub.perform("update_server", data);
            },
            kickMember: (data, sub) => {
                return sub.perform("kick_member", data);
            },
            leaveServer: (data, sub) => {
                return sub.perform("leave_server", data);
            },
            deleteServer: (sub) => {
                return sub.perform("delete_server");
            },
            newChannel: (data, sub) => {
                return sub.perform("new_channel", data);
            },
            updateChannel: (data, sub) => {
                return sub.perform("update_channel", data);
            },
            deleteChannel: (data, sub) => {
                return sub.perform("delete_channel", data);
            },
            updateNickname: (data, sub) => {
                return sub.perform("update_nickname", data);
            },
            createInvite: (data, sub) => {
                return sub.perform("create_invite", data);
            },
            unsubscribe: (sub) => {
                return sub.perform("unsubscribed");
            },
        }
    )
);

export const createChatSub = (
    that,
    type,
    dispatch,
) => (
    App.cable.subscriptions.create(
        {
            channel: `ChatChannel`,
            type,
            chatId: that.props.chat.id,
        },
        {
            received: data => {
                let messages;
                switch (data.action) {
                    case "load":
                        dispatch(receiveMessages(data.messages));
                        break;
                    case "new message":
                        dispatch(receiveMessage(data.message));
                        that.setState({
                            messages: that.state.messages.concat(data.message)
                        });
                        break;
                    case "update message":
                        dispatch(receiveMessage(data.message));
                        messages = {};
                        that.state.messages.forEach(message => messages[message.id] = message);
                        messages[data.message.id] = data.message;
                        that.setState({
                            messages: Object.values(messages),
                        });
                        break;
                    case "delete message":
                        dispatch(removeMessage(data.messageId));
                        messages = {};
                        that.state.messages.forEach(message => messages[message.id] = message);
                        delete messages[data.messageId];
                        that.setState({
                            messages: Object.values(messages),
                        });
                        break;
                    default:
                        break;
                }
            },
            speak: (data) => {
                return that.subscription.perform("speak", data);
            },
            update: (data) => {
                return that.subscription.perform("update", data);
            },
            delete: (data) => {
                return that.subscription.perform("destroy", data);
            },
            unsubscribe: () => {
                return that.subscription.perform("unsubscribed");
            },
            load: () => {
                return that.subscription.perform("load");
            }
        }
    )
);

export const createSessionSub = (
    currentUserId,
    dispatch,
) => (
    App.cable.subscriptions.create(
        {
            channel: `SessionChannel`,
            currentUserId,
        },
        {
            received: data => {
                switch (data.action) {
                    case "initiate conversation": // convo, memberships
                        dispatch(receiveConversation(data.payload));
                        break;
                    case "new conversation member":
                        dispatch(receiveNewMember(data.payload));
                        break;
                    case "remove_server":
                        dispatch(removeServer(data.payload));
                        break;
                    default:
                        break;
                }
            },
            newConvo: (data, sub) => { // need userId of other person
                return sub.perform("new_convo", data);
            },

            unsubscribe: (sub) => {
                return sub.perform("unsubscribed");
            },
        }
    )
);