import {
    receiveServer,
    receiveServerErrors,
    leftServer,
} from '../actions/server_actions';

import {
    receiveNewMember
} from '../actions/user_actions';

import {
    receiveCreatedChannel,
    receiveUpdatedChannel
} from '../actions/channel_actions';

import {
    removeMembership,
} from '../actions/membership_actions';

import {
    receiveMessage,
    receiveMessages,
} from '../actions/message_actions';


export const createServerSub = (
    server,
    currentUser,
    history,
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
                        if (!data.errors) {
                            if (currentUser.id === data.payload.userId) {
                                history.push("/channels/@me");
                                dispatch(leftServer(data.payload));
                            } else {
                                dispatch(removeMembership(data.payload.membershipId));
                            }
                        } else {
                            dispatch(receiveServerErrors(data.error));
                        }
                        break;
                    case "update server":
                        dispatch(receiveServer(data.server));
                        break;
                    case "new channel":
                        dispatch(receiveCreatedChannel(data.channel));
                    case "update channel":
                        dispatch(receiveUpdatedChannel(data.payload));
                    default:
                        break;
                }
            },
            updateServer: (data, sub) => {
                return sub.perform("update_server", data);
            },
            newMember: (data, sub) => {
                return sub.perform("new_member", data);
            },
            kickMember: (data, sub) => {
                return sub.perform("kick_member", data);
            },
            newChannel: (data, sub) => {
                // data = { channel } returns new { channel }
                return sub.perform("new_channel", data);
            },
            updateChannel: (data, sub) => {
                // data = { channel } return new channel and last 50 messages
                return sub.perform("update_channel", data);
            },
            updateNickname: (data, sub) => {
                return sub.perform("update_nickname", data);
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
                switch (data.action) {
                    case "load":
                        dispatch(receiveMessages(data.messages));
                        break;
                    case "new message":
                        dispatch(receiveMessage(data.message));
                        that.setState.call(that, ({
                            messages: that.state.messages.concat(data.message)
                        }));
                        break;
                    default:
                        break;
                }
            },
            speak: (data) => {
                return that.subscription.perform("speak", data);
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