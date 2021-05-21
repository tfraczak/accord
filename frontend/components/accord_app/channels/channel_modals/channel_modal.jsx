import React, { Component } from 'react';
import { closeModal } from '../../../../actions/ui_actions';
import { connect } from 'react-redux';
import CreateTextChannelContainer from './create_channel_form/create_text_channel_container';

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
		const { modal } = this.props;
		if (!modal) {
			return null;
		}

		let component;
		
		switch (modal) {
		case 'create channel':
			component = <CreateTextChannelContainer />;
			break;
		default:
			return null;
		}
		
		return (
			<div className="acf-modal-background">
				<div 
				className="acf-modal-child"
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

export default connect(mSTP, mDTP)(CreateChannelModal);