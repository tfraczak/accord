import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import ServersNavBarContainer from './servers/servers_nav_bar/servers_nav_bar_container';
import ServerMembersListContainer from './servers/server_members_list/server_members_list_container';
import ConversationMembersList from './conversations/conversation_members_list/conversation_members_list_container';
import ServerToolbarContainer from './servers/server_toolbar/server_toolbar_container';
import AddServerModal from './servers/server_modals/add_server_modal';
import ChannelsIndexContainer from './channels/channels_index/channels_index_container';
import ChannelChatTitleContainer from './channels/channel_chat_title/channel_chat_title_container';
import MainFocusContainer from './main-focus/main_focus_container';
import CurrentUserDisplayContainer from './current_user/current_user_display_container';
import SbHeaderContainer from './sb-header/sb_header_container';
import ChatPlaceholder from './main-focus/chat_placeholder';

class AccordApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                        <Route path="/channels/:serverId/" component={SbHeaderContainer}/>
                                    </div>
                                    <div className="focus-channels-dms">
                                        <Switch>
                                            <Route exact path="/channels/@me" component={ConversationMembersList} />
                                            <Route path="/channels/:serverId/" component={ChannelsIndexContainer} />
                                        </Switch>
                                    </div>
                                </nav>
                                <div className="sidebar-current-user">
                                    <CurrentUserDisplayContainer />
                                </div>
                            </div>

                            <div className="focus">
                                <div className="focus-title-bar">
                                    <div className="focus-title">
                                        <Switch>
                                            <Route exact path="/channels/@me" component={ConversationMembersList} />
                                            <Route exact path="/channels/:serverId/:channelId" component={ChannelChatTitleContainer} />
                                        </Switch>
                                    </div>
                                    <div className="title-toolbar"></div>
                                </div>
                                <div className="focus-content">
                                    <Switch>
                                        <Route path="/channels/:serverId/:channelId" component={MainFocusContainer} />
                                        <ChatPlaceholder />
                                    </Switch>
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