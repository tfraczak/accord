import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Chat from './chat';
import { receiveMessage, receiveMessages } from '../../../actions/message_actions';
import { createMessage } from '../../../utils/message_utils';
import { chatMessages } from '../../../utils/selectors';
import { conversationMembersObj } from '../../../utils/selectors';

const mSTP = (state, ownProps) => {
    const chat = state.entities.conversations[ownProps.match.params.conversationId];
    const type = "Conversation";
    const messages = chatMessages(chat, type, state.entities.messages);
    const chatMembersObj = conversationMembersObj(state.entities.users, chat, state.entities.memberships);
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
        createMessage: message => dispatch(createMessage(message)),
        receiveMessages: messages => dispatch(receiveMessages(messages)),
    };
};

export default withRouter(connect(mSTP, mDTP)(Chat));