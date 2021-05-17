import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import ServersNavBarContainer from './servers/servers_nav_bar/servers_nav_bar_container';
import ServerMembersListContainer from './servers/server_members_list/server_members_list_container';
import ConversationMembersList from './conversations/conversation_members_list/conversation_members_list_container';
import ServerToolbarContainer from './servers/server_toolbar/server_toolbar_container';
import AddServerModal from './servers/server_modals/add_server_modal';

class AccordApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.servers.length) {
            this.props.history.push("/app");
        }
    }

    render() {
        return (
            <>
                <AddServerModal />
                <div className="webapp-wrapper">
                    <ServersNavBarContainer />
                    <div className="base wrapper">
                        <div className="content wrapper">

                            <div className="sidebar-wrapper">
                                <nav className="sidebar-nav">
                                    <div className="sb-header wrapper">
                                        <header className="sb-header server-toolbar">
                                            <Switch>
                                                <Route exact path="/channels/@me" component={ConversationMembersList} />
                                                <Route path="/channels/:serverId" component={ ServerToolbarContainer } />
                                            </Switch>
                                        </header>
                                    </div>
                                    <div className="focus-channels-dms">
                                    
                                    </div>
                                </nav>
                                <div className="sidebar-current-user"></div>
                            </div>

                            <div className="focus">
                                <div className="focus-title-bar">
                                    <div className="focus-title"></div>
                                    <div className="title-toolbar"></div>
                                </div>
                                <div className="focus-content">
                                    <div className="main-focus">
                                        <div className="messages-wrapper"></div>
                                        <form className="message-form">
                                            <input className="message-input" type="text" placeholder="Message" />
                                        </form>
                                    </div>
                                    <div className="focus-right-wrapper">
                                        <Switch>
                                            <Route exact path="/channels/@me" component={ConversationMembersList} />
                                            <Route path="/channels/:serverId" component={ServerMembersListContainer}/>
                                        </Switch>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

}


export default AccordApp;