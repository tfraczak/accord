import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Chat from './chat';
import { receiveMessage, receiveMessages } from '../../../actions/message_actions';
import { retrieveConversation } from '../../../actions/conversation_actions';
import { retrieveChannel } from '../../../actions/channel_actions';
import { createMessage } from '../../../utils/message_utils';
import { createChatSub } from '../../../utils/socket_utils';
import { chatMessages } from '../../../utils/selectors';
import { convoMembersObj } from '../../../utils/selectors';
import { limitChars } from '../../../utils/func_utils';

const mSTP = (state, ownProps) => {
    const chat = state.entities.conversations[ownProps.match.params.conversationId];
    const type = "Conversation";
    const messages = chatMessages(chat, type, state.entities.messages);
    const users = state.entities.users;
    const chatMembersObj = convoMembersObj(state.entities.users, chat, state.entities.memberships);
    const currentUserId = state.session.id;
    let otherUser, placeholder;
    if (Object.values(chatMembersObj).length < 3) {
        otherUser = currentUserId === chat.receiverId ?
            users[chat.initiatorId] :
            users[chat.receiverId];
        placeholder = `Message @${otherUser.username}`;
    } else {
        const convoMembers = Object.values(chatMembersObj);
        const otherMembers = convoMembers.filter(member => member.id !== currentUserId);
        const convoMemberNames = otherMembers.map(member => member.username);
        placeholder = chat.name ? 
            `Message ${chat.name}` : 
            `Message ${limitChars(convoMemberNames.join(", "), 48)}`;
    }
    return {
        chat,
        type,
        currentUserId: state.session.id,
        messages,
        chatMembers: chatMembersObj,
        placeholder
    }
};

const mDTP = dispatch => {
    return {
        receiveMessage: message => dispatch(receiveMessage(message)),
        createMessage: message => dispatch(createMessage(message)),
        receiveMessages: messages => dispatch(receiveMessages(messages)),
        retrieveConversation: convoId => dispatch(retrieveConversation(convoId)),
        retrieveChannel: channelId => dispatch(retrieveChannel(channelId)),
        createChatSub: chatComponent => createChatSub(chatComponent, "Conversation", dispatch),
    };
};

export default withRouter(connect(mSTP, mDTP)(Chat));