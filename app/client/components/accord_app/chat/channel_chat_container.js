import { withRouter } from '@utils';
import { connect } from 'react-redux';
import Chat from './chat';
import { receiveMessage, receiveMessages } from '../../../actions/message_actions';
import { createChatSub } from '../../../utils/socket_utils';
import { chatMessages, serverMembersObj } from '@selectors';
import { retrieveChannel } from '../../../actions/channel_actions';
import { retrieveConversation } from '../../../actions/conversation_actions';

const mSTP = (state, ownProps) => {
  const chat = state.entities.channels[ownProps.match.params.channelId];
  // if (!chat) {
  //     ownProps.history.push("/channels/@me");
  //     return {};
  // }
  const type = 'Channel';
  const messages = chatMessages(chat, type, state.entities.messages);
  const server = state.entities.servers[ownProps.match.params.serverId];
  const chatMembersObj = serverMembersObj(state.entities.users, server, state.entities.memberships);
  let placeholder = `Message # ${chat.name}`;
  let channels = state.entities.channels;
  let conversations = state.entities.conversations;
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
    retrieveChannel: (channelId) => dispatch(retrieveChannel(channelId)),
    retrieveConversation: (convoId) => dispatch(retrieveConversation(convoId)),
    createChatSub: (chatComponent) => createChatSub(chatComponent, 'Channel', dispatch),
  };
};

export default withRouter(connect(mSTP, mDTP)(Chat));