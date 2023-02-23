import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import ServersNavBarContainer from './servers/servers_nav_bar/servers_nav_bar_container';
import ServerMembersListContainer from './servers/server_members_list/server_members_list_container';
import ConversationMembersList from './conversations/conversation_members_list/conversation_members_list_container';
import ServerToolbarContainer from './servers/server_toolbar/server_toolbar_container';
import ServersModal from './servers/server_modals/servers_modal';
import ChannelsIndexContainer from './channels/channels_index/channels_index_container';
import ConversationsIndexContainer from './conversations/conversations_index/conversations_index_container';
import ChannelChatTitleContainer from './channels/channel_chat_title/channel_chat_title_container';
import ConversationChatTitleContainer from './conversations/conversation_chat_title/conversation_chat_title_container';
import MainFocusContainer from './main-focus/main_focus_container';
import CurrentUserDisplayContainer from './current_user/current_user_display_container';
import SbHeaderContainer from './sb-header/sb_header_container';
import ChatPlaceholder from './main-focus/chat_placeholder';
import ChannelsModal from './channels/channel_modals/channels_modal';
import FocusRightContainer from './focus-right/focus_right_container';
import UserModal from './user/user_modal/user_modal';

const AccordApp = (props) => {
  const { channelId, serverId, convoId } = props;
  return (
    <>
      <Route path="/channels/:serverId" element={<ServersModal />} />
      <Route path="/channels/:serverId/:channelId" element={<ChannelsModal />}/>
      <Route path="/channels" element={<UserModal />} />
      <div className="webapp-wrapper">
        <ServersNavBarContainer />
        <div className="base wrapper">
          <div className="content wrapper">

            <div className="sidebar-wrapper">
              <nav className="sidebar-nav">
                <div className="sb-header wrapper">
                  <Route path="/channels" element={<SbHeaderContainer />}/>
                </div>
                <div className="focus-channels-dms">
                  <Routes>
                    <Route path="/channels/@me" >
                      <ConversationsIndexContainer />
                    </Route>
                    <Route path="/channels/:serverId/" >
                      <ChannelsIndexContainer key={ `channels-index-s${serverId}` } />
                    </Route>
                  </Routes>
                </div>
              </nav>
              <div className="sidebar-current-user">
                <CurrentUserDisplayContainer />
              </div>
            </div>

            <div className="focus">
              <div className="focus-title-bar">
                <div className="focus-title">
                  <Routes>
                    <Route  path="/channels/@me/:conversationId" >
                      <ConversationChatTitleContainer key={ `convo-${convoId}` }/>
                    </Route>
                    <Route  path="/channels/:serverId/:channelId" >
                      <ChannelChatTitleContainer key={ `channel-chat-s${serverId}-c${channelId}` } />
                    </Route>
                  </Routes>
                </div>
                <div className="title-toolbar"></div>
              </div>
              <div className="focus-content">
                <Route path="/channels/" element={<MainFocusContainer />} />
                <div className="focus-right-wrapper">
                  <FocusRightContainer />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AccordApp;