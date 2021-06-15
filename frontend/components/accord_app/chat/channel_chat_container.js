import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Chat from './chat';
import { receiveMessage, receiveMessages } from '../../../actions/message_actions';
import { createMessage } from '../../../utils/message_utils';
import { createChatSub } from '../../../utils/socket_utils';
import { chatMessages } from '../../../utils/selectors';
import { serverMembersObj } from '../../../utils/selectors';
import { retrieveChannel } from '../../../actions/channel_actions';
import { receiveChatSub } from '../../../actions/socket_actions';

const mSTP = (state, ownProps) => {
    const chat = state.entities.channels[ownProps.match.params.channelId];
    const type = "Channel";
    const messages = chatMessages(chat, type, state.entities.messages);
    const server = state.entities.servers[ownProps.match.params.serverId];
    const chatMembersObj = serverMembersObj(state.entities.users, server, state.entities.memberships);
    const chatSub = state.subscriptions.chats[chat.id];
    return {
        chat,
        type,
        currentUserId: state.session.id,
        messages,
        chatMembers: chatMembersObj,
        chatSub,
    }
};

const mDTP = dispatch => {
    return {
        receiveMessage: message => dispatch(receiveMessage(message)),
        createMessage: message => dispatch(createMessage(message)),
        receiveMessages: messages => dispatch(receiveMessages(messages)),
        retrieveChannel: channelId => dispatch(retrieveChannel(channelId)),
        receiveChatSub: chatSub => dispatch(receiveChatSub(chatSub)),
        createChatSub: chatComponent => createChatSub(chatComponent, "Channel", dispatch),
    };
};

export default withRouter(connect(mSTP, mDTP)(Chat));