import React, { Component } from 'react';
import { closeModal } from '../../../../actions/ui_actions';
import { connect } from 'react-redux';
import CreateTextChannelContainer from './create_channel_form/create_text_channel_container';
import ChannelSettingsContainer from './channel_settings/channel_settings_container';

class CreateChannelModal extends Component {
    constructor(props) {
      super(props);
    }

	escModal(e) {
		if (e.keyCode === 27) {
			document.getElementById("add-channel-btn").classList.remove("open-modal");
			document.getElementById("add-channel-btn").blur(); 
			this.props.closeModal();
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.escModal, false);
	}

    render() {
		const { modal, payload } = this.props;
		if (!modal && !payload) {
			return null;
		}

		let component, bgClassName, childClassName;
		
		if(payload) {
			component = <ChannelSettingsContainer channel={payload.channel} />;
			bgClassName = "csf-modal-background";
			childClassName = "csf-modal-child";
			break;
		} else {
			switch (modal) {
			case 'create channel':
				component = <CreateTextChannelContainer />;
				bgClassName = "acf-modal-background";
				childClassName = "acf-modal-child";
				break;
			default:
				return null;
			}
		}

		return (
			<div className={ bgClassName }>
				<div 
				className={ childClassName }
				onClick={ e => e.stopPropagation() }>

				{ component }
				
				</div>
			</div>
		);
	}
}

const mSTP = state => {
  return {
    modal: state.ui.modal,
		payload: state.ui.payload,
  };
};

const mDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mSTP, mDTP)(CreateChannelModal);