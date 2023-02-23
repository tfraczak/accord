import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ServerMembersListContainer from '../servers/server_members_list/server_members_list_container';
import ConversationMembersList from '../conversations/conversation_members_list/conversation_members_list';

export default (props) => {
  if (!props.server) return <div className="focus-right-wrapper"></div>;
  return (
    <div className="focus-right-wrapper">
      <Routes>
        <Route path="/channels/@me">
          <ConversationMembersList key={`convo-${props.chatId}`}/>
        </Route>
        <Route path="/channels/:serverId/:channelId" >
          <ServerMembersListContainer
            key={`chat-${props.server.id}-${props.members.length}${props.createdConvo ? `-${props.createdConvo.id}` : ''}`}
          />
        </Route>
      </Routes>
    </div>
  );
};