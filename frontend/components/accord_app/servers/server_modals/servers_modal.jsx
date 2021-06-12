import React from 'react';
import { closeModal } from '../../../../actions/ui_actions';
import { connect } from 'react-redux';
import CreateServerFormContainer from '../servers_nav_bar/add_server/create_server_form_container';
import JoinServerFormContainer from '../servers_nav_bar/add_server/join_server_form_container';
import ServerInvitationContainer from '../server_toolbar/invitation/server_invitation_container';
import ServerSettingsContainer from '../server_toolbar/settings/server_settings_container';

class ServerModal extends React.Component {
    constructor(props) {
      super(props);
	  this.escModal = this.escModal.bind(this);
    }

	escModal(e) {
		if (e.keyCode === 27) {
			document.getElementById("asf-button").classList.remove("active");
			document.getElementById("asf-button").blur(); 
			this.props.closeModal();
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.escModal, false);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.escModal);
	}

  render() {
		const { modal, closeModal } = this.props;
		if (!modal) {
			return null;
		}

		let component, className, childClassName;

		switch (modal) {
			case 'create server':
				className = "asf-modal-background";
				childClassName = "asf-modal-child";
				component = <CreateServerFormContainer />;
				break;
			case 'join server':
				className = "asf-modal-background";
				childClassName = "asf-modal-child";
				component = <JoinServerFormContainer />;
				break;
			case 'invitation':
				className = "invite-modal-background";
				childClassName = "invite-modal-child";
				component = <ServerInvitationContainer />;
				break;
			case 'server settings':
				className = "server-settings-modal-background";
				childClassName = "server-settings-modal-child";
				component = <ServerSettingsContainer />;
				break;
			case 'nickname':
				className = "nickname-modal-background";
				childClassName = "nickname-modal-child";
				// component = <NicknameFormContainer />;
				break;
			default:
				return null;
		}
		
		
		return (
			<div className={ className }>
				<div 
				className={ childClassName }
				onClick={e => e.stopPropagation()}>

				{ component }
				
				</div>
			</div>
		);
	}
}

const mSTP = state => {
  return {
    modal: state.ui.modal,
  };
};

const mDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mSTP, mDTP)(ServerModal);