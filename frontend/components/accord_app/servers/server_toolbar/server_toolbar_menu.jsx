import React, { Component } from "react";
import CreateChannelButton from '../../channels/channel_modals/create_channel_form/create_channel_button';
import ServerInvitationButton from './invitation/server_invitation_button';
import ServerSettingsButton from './settings/server_settings_button';
import ChangeNicknameButton from './nickname/server_nickname_button';

class ServerToolbarMenu extends Component {
  constructor(props) {
    super(props);
    this.handleLeave = this.handleLeave.bind(this);
    // this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (this.props.wrapperRef && (!this.props.wrapperRef.contains(e.target) || e.target === this.props.dropdownBtnRef)) {
      if (this.props.dropdownBtnRef.classList.contains("open")){
        this.props.dropdownBtnRef.classList.remove("open");
        this.props.closeToolbar(); 
      } else if(e.target === this.props.dropdownBtnRef){
        this.props.dropdownBtnRef.classList.add("open");
      }
    }
  }

  handleLeave() {
    const {
      membershipId,
      currentUserId,
      serverSub,
    } = this.props;

    const cableData = {
      membershipId,
      currentUserId
    };

    this.props.closeToolbar();
    this.props.history.push("/channels/@me");

    serverSub.leaveServer(cableData, serverSub);
    // this.props.leaveServer();
    
  }

  render() {
    const {
      server,
      isOwner,
      openModal,
      closeToolbar,
    } = this.props;
    return (
      <ul
        id="server-tools"
        className="st-closed"
      >

        <ServerInvitationButton 
          key={`invitation-${server.id}`}
          openModal={ () => openModal("invitation") }
          closeToolbar={ closeToolbar }
        />

        {
          isOwner ?
          (
            <ServerSettingsButton 
              key={`server-settings-${server.id}`} 
              openModal={ () => openModal("server settings") }
              closeToolbar={ closeToolbar }
            />
          ) : null
        }

        <CreateChannelButton
          key={ `create-channel-${server.id}` }
          inServerMenu={ true }
          isOwner={ isOwner }
          openModal={ openModal }
          closeToolbar={ closeToolbar }
        />

        <div className="separator"></div>

        <ChangeNicknameButton 
          key={ `change-nickname-${server.id}` }
          openModal={ () => openModal("nickname") }
          closeToolbar={ closeToolbar }
        />
        
        <li>
        { isOwner ? null :
            (
              <button onClick={ this.handleLeave } className="st-menu-btn leave-server">
                <h6>Leave Server</h6>
                <i className="fas fa-sign-out-alt"></i>
              </button>
            )
          }
        </li>

      </ul>
    );
  }

}

export default ServerToolbarMenu;