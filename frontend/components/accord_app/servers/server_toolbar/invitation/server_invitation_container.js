import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeModal } from '../../../../../actions/ui_actions';
import { createInvite, removeInvitation } from '../../../../../actions/invitation_actions';
import ServerInvitation from './server_invitation';

const mSTP = (state, ownProps) => {
  const server = state.entities.servers[ownProps.location.pathname.split("/")[2]];
  const invitation = state.session.invitation;
  const currentUser = state.entities.users[state.session.id];

  return {
    currentUser,
    server,
    invitation
  };
};

const mDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    createInvite: serverId => dispatch(createInvite(serverId)),
    removeInvitation: () => dispatch(removeInvitation()),
  };
};

export default withRouter(connect(mSTP, mDTP)(ServerInvitation));