import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from '@utils';
import UserShowContainer from '../user_show/user_show_container';
import { closeModal } from '../../../../actions/ui_actions';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.escModal = this.escModal.bind(this);
  }

  escModal(e) {
    if (e.key === 'Escape' && this.props.modal) {
      this.props.closeModal();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escModal, false);
  }

  componentWillUnmount() {
    this.props.closeModal();
    document.removeEventListener('keydown', this.escModal);
  }

  render() {
    const { modal, createdConvo } = this.props;
    if (!modal) {
      return null;
    }

    let component, className, childClassName;
    switch (modal.type) {
    // case 'my account':
    //   className = "my-account-modal-background";
    //   childClassName = "my-account-modal-child";
    //   component = <UserSettingsContainer />;
    //   break;
    case 'user show':
      className = 'user-show-modal-background';
      childClassName = 'user-show-modal-child';
      component = <UserShowContainer key={ `user-show-${modal.user.id}${createdConvo ? `-${createdConvo.id}` : '' }` } user={ modal.user } />;
      break;
    default:
      return null;
    }

    return (
      <div className={ className }>
        <div
          className={ childClassName }
          onClick={(e) => e.stopPropagation()}>

          { component }

        </div>
      </div>
    );
  }
}

const mSTP = (state, ownProps) => {
  const createdConvo = state.session.conversation;
  return {
    modal: state.ui.modal,
    createdConvo,
  };
};

const mDTP = (dispatch) => {
  return { closeModal: () => dispatch(closeModal()) };
};

export default withRouter(connect(mSTP, mDTP)(UserModal));