import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatContainer from '../chat/chat_container';
import ConversationMembersList from '../conversations/conversation_members_list/conversation_members_list';

export default props => {
    
    return (
        <div className="main-focus">
            <Switch>
                <Route exact path="/channels/@me" >
                    <ConversationMembersList />
                </Route>
                <Route exact path="/channels/:serverId/:channelId" >
                    <ChatContainer key={`chat-${props.chatId}`} />
                </Route>
            </Switch>
        </div>
    )
};