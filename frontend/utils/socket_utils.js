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


export const createServerSub = (server, dispatch, currentUser, history) => (
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
            unsubscribe: () => {
                return this.subscription.perform("unsubscribe");
            },
        }
    )
);