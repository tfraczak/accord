import React, { Component } from "react";
import CreateChannelButton from '../../channels/channel_modals/create_channel_form/create_channel_button';
import ServerInvitationButton from './invitation/server_invitation_button';
import ServerSettingsButton from './settings/server_settings_button';

class ServerToolbarMenu extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      server,
      isOwner,
      openModal,
      openFullModal,
      closeToolbar,
    } = this.props;
    return (
      <ul
        id="server-tools"
        className="st-closed">

        <ServerInvitationButton 
          key={`invitation-${server.id}`}
          openModal={ () => openModal("invitation") }
          closeToolbar={ () => closeToolbar() }
        />

        <ServerSettingsButton 
          key={`server-settings-${server.id}`} 
          openModal={ () => openModal("server settings") }
          closeToolbar={ () => closeToolbar() }
        />

        <CreateChannelButton
          key={`create-channel-${server.id}`}
          inServerMenu={ true }
          isOwner={ isOwner }
          openModal={ openModal }
          closeToolbar={ closeToolbar }
        />

        <div className="separator"></div>

        <li>
          {/* open modal */}
          {/* <ChangeNicknameButton key={`change-nickname-${server.id}`} /> */}
          <button onClick={closeToolbar} className="st-menu-btn change-nickname">
            <h6>Change Nickname</h6>
            <i className="fas fa-pencil-alt"></i>
          </button>
        </li>

      </ul>
    );
  }

}

export default ServerToolbarMenu;