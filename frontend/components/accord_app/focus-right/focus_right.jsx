import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ServerMembersListContainer from '../servers/server_members_list/server_members_list_container';
import ConversationMembersList from '../conversations/conversation_members_list/conversation_members_list';

export default props => {
    if (!props.server) return <div className="focus-right-wrapper"></div>
    return (
        <div className="focus-right-wrapper">
            <Switch>
                <Route path="/channels/@me">
                    <ConversationMembersList key={`convo-${props.chatId}`}/>
                </Route>
                <Route exact path="/channels/:serverId/:channelId" >
                    <ServerMembersListContainer key={`chat-${props.server.id}-${props.members.length}${props.createdConvo ? `-${props.createdConvo.id}` : ""}`} />
                    {/* <ServerMembersListContainer key={Math.floor(Math.random()*10000000)} /> */}
                </Route>
            </Switch>
        </div>
    )
};