import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChannelChatContainer from '../chat/channel_chat_container';
import ConversationChatContainer from '../chat/conversation_chat_container';
import ChatPlaceholder from './chat_placeholder';

export default props => {
    return (
        <div className="main-focus">
            <Switch>
                <Route exact path="/channels/@me/:conversationId">
                    <ConversationChatContainer key={ `convo-chat-${props.chatId}${props.convoMembers ? props.convoMembers.length : ""}` } />
                </Route>
                <Route exact path="/channels/:serverId/:channelId" >
                    <ChannelChatContainer key={ `channel-chat-${props.chatId}` } />
                </Route>
                <Route>
                    <ChatPlaceholder />
                </Route>
            </Switch>
        </div>
    )
};