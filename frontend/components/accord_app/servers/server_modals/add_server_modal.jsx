import React from 'react';
import { closeModal } from '../../../../actions/ui_actions';
import { connect } from 'react-redux';
import CreateServerFormContainer from '../servers_nav_bar/add_server/create_server_form_container';
import JoinServerFormContainer from '../servers_nav_bar/add_server/join_server_form_container';

class ServerFormModal extends React.Component {
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

		let component;
		
		switch (modal) {
		case 'create server':
			component = <CreateServerFormContainer />;
			break;
		case 'join server':
			component = <JoinServerFormContainer />;
			break;
		default:
			return null;
		}
		
		return (
			<div className="asf-modal-background">
				<div 
				className="asf-modal-child"
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

export default connect(mSTP, mDTP)(ServerFormModal);