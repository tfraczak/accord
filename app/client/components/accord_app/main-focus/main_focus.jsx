import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChannelChatContainer from '../chat/channel_chat_container';
import ConversationChatContainer from '../chat/conversation_chat_container';
import ChatPlaceholder from './chat_placeholder';

export default (props) => {
  const {
    chatId,
    convoMembers,
  } = props;
  return (
    <div className="main-focus">
      <Routes>
        <Route path="/channels/@me/:conversationId">
          <ConversationChatContainer key={ `convo-chat-${chatId}${convoMembers ? convoMembers.length : ''}` } />
        </Route>
        <Route path="/channels/:serverId/:channelId" >
          <ChannelChatContainer key={ `channel-chat-${chatId}` } />
        </Route>
        <Route>
          <ChatPlaceholder />
        </Route>
      </Routes>
    </div>
  );
};