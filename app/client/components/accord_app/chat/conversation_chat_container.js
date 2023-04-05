import { withRouter } from '@utils';
import { connect } from 'react-redux';
import Chat from './chat';
import { receiveMessage, receiveMessages } from '../../../actions/message_actions';
import { retrieveConversation } from '../../../actions/conversation_actions';
import { retrieveChannel } from '../../../actions/channel_actions';
import { createChatSub } from '../../../utils/socket_utils';
import { chatMessages, convoMembersObj } from '@selectors';
import { limitChars } from '@helpers';

const mSTP = (state, ownProps) => {
  const chat = state.entities.conversations[ownProps.match.params.conversationId];
  // if (!chat) {
  //     ownProps.history.push("/channels/@me");
  //     return {};
  // }
  const type = 'Conversation';
  const messages = chatMessages(chat, type, state.entities.messages);
  const users = state.entities.users;
  const chatMembersObj = convoMembersObj(state.entities.users, chat, state.entities.memberships);
  const currentUserId = state.session.id;
  let otherUser, placeholder;
  let channels = state.entities.channels;
  let conversations = state.entities.conversations;
  if (Object.values(chatMembersObj).length < 3) {
    otherUser = currentUserId === chat.receiverId ?
      users[chat.initiatorId] :
      users[chat.receiverId];
    placeholder = `Message @${otherUser.username}`;
  } else {
    const convoMembers = Object.values(chatMembersObj);
    const otherMembers = convoMembers.filter((member) => member.id !== currentUserId);
    const convoMemberNames = otherMembers.map((member) => member.username);
    placeholder = chat.name ?
      `Message ${chat.name}` :
      `Message ${limitChars(convoMemberNames.join(', '), 48)}`;
  }
  return {
    chat,
    type,
    currentUserId: state.session.id,
    messages,
    chatMembers: chatMembersObj,
    placeholder,
    channels,
    conversations,
  };
};

const mDTP = (dispatch) => {
  return {
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    receiveMessages: (messages) => dispatch(receiveMessages(messages)),
    retrieveConversation: (convoId) => dispatch(retrieveConversation(convoId)),
    retrieveChannel: (channelId) => dispatch(retrieveChannel(channelId)),
    createChatSub: (chatComponent) => createChatSub(chatComponent, 'Conversation', dispatch),
  };
};

export default withRouter(connect(mSTP, mDTP)(Chat));