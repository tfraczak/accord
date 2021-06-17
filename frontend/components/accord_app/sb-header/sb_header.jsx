import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ServerToolbarContainer from '../servers/server_toolbar/server_toolbar_container';
import ConversationMembersList from '../conversations/conversation_members_list/conversation_members_list';

export default props => {
    
    return (
        <header className="sb-header server-toolbar">
            <Switch>
                <Route exact path="/channels/@me/" >
                    <ConversationMembersList />
                </Route>
                <Route exact path="/channels/@me/:conversationId" >
                    <ConversationMembersList />
                </Route>
                <Route path="/channels/:serverId" >
                    <ServerToolbarContainer key={`sbt-${props.serverId}`} />
                </Route>
            </Switch>
        </header>
    )
};