import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import ServersNavBarContainer from './servers/servers_nav_bar/servers_nav_bar_container';
import ServerMembersListContainer from './servers/server_members_list/server_members_list_container';
import ConversationMembersList from './conversations/conversation_members_list/conversation_members_list_container';
import ServerToolbarContainer from './servers/server_toolbar/server_toolbar_container';
import ServersModal from './servers/server_modals/servers_modal';
import ChannelsIndexContainer from './channels/channels_index/channels_index_container';
import ChannelChatTitleContainer from './channels/channel_chat_title/channel_chat_title_container';
import MainFocusContainer from './main-focus/main_focus_container';
import CurrentUserDisplayContainer from './current_user/current_user_display_container';
import SbHeaderContainer from './sb-header/sb_header_container';
import ChatPlaceholder from './main-focus/chat_placeholder';
import ChannelsModal from './channels/channel_modals/channels_modal';
import FocusRightContainer from './focus-right/focus_right_container';
import UserModal from './user/user_modal/user_modal';

class AccordApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // if (!this.props.servers.length) {
        //     this.props.history.push("/app");
        // }
    }

    render() {
        return (
            <>
                <Route path="/channels/:serverId" component={ ServersModal } />
                <Route exact path="/channels/:serverId/:channelId" component={ ChannelsModal }/>
                <Route path="/channels" component={ UserModal } />
                <div className="webapp-wrapper">
                    <ServersNavBarContainer />
                    <div className="base wrapper">
                        <div className="content wrapper">

                            <div className="sidebar-wrapper">
                                <nav className="sidebar-nav">
                                    <div className="sb-header wrapper">
                                        <Route path="/channels" component={SbHeaderContainer}/>
                                    </div>
                                    <div className="focus-channels-dms">
                                        <Switch>
                                            <Route exact path="/channels/@me" component={ConversationMembersList} />
                                            <Route path="/channels/:serverId/" >
                                                <ChannelsIndexContainer key={ `channels-index-s${this.props.serverId}` } />
                                            </Route>
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
                                            <Route exact path="/channels/@me/:conversationId" >
                                                <ConversationMembersList key={ Math.random()*1000000 } />
                                                {/* <div></div> */}
                                            </Route>
                                            <Route exact path="/channels/:serverId/:channelId" >
                                                <ChannelChatTitleContainer key={ `channel-chat-s${this.props.serverId}-c${this.props.channelId}` } />
                                            </Route>
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
                                        {/* <Switch>
                                            <Route exact path="/channels/@me" component={ConversationMembersList} />
                                            <Route path="/channels/:serverId" component={ServerMembersListContainer}/>
                                        </Switch> */}
                                        <FocusRightContainer />
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