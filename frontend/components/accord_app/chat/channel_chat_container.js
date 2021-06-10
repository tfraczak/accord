import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Chat from './chat';
import { createChatSocket } from '../../../utils/socket_utils';
import { receiveMessage, receiveMessages } from '../../../actions/message_actions';
import { createMessage } from '../../../utils/message_utils';
import { chatMessages } from '../../../utils/selectors';
import { serverMembersObj } from '../../../utils/selectors';
import { retrieveChannel } from '../../../actions/channel_actions';

const mSTP = (state, ownProps) => {
    const chat = state.entities.channels[ownProps.match.params.channelId];
    const type = "Channel";
    const messages = chatMessages(chat, type, state.entities.messages);
    const server = state.entities.servers[ownProps.match.params.serverId];
    const chatMembersObj = serverMembersObj(state.entities.users, server, state.entities.memberships);
    return {
        chat,
        type,
        currentUserId: state.session.id,
        messages,
        chatMembers: chatMembersObj,
    }
};

const mDTP = dispatch => {
    return {
        receiveMessage: message => dispatch(receiveMessage(message)),
        createChatSocket,
        createMessage: message => dispatch(createMessage(message)),
        receiveMessages: messages => dispatch(receiveMessages(messages)),
        retrieveChannel: channelId => dispatch(retrieveChannel(channelId)),
    };
};

export default withRouter(connect(mSTP, mDTP)(Chat));