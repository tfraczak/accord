import { connect } from 'react-redux';
import { withRouter } from '@utils';
import * as ServerActions from '../../../../actions/server_actions';
import ServersNavBar from './servers_nav_bar';
import { openModal, closeModal } from '../../../../actions/ui_actions';
import { removeServerSubs } from '../../../../actions/socket_actions';


const mSTP = (state, ownProps) => {
  return {
    servers: Object.values(state.entities.servers),
    currentUserId: state.session.id,
    invitedServer: state.session.invitedServer,
  };
};

const mDTP = (dispatch, ownProps) => ({
  createServer: (server) => dispatch(ServerActions.createServer(server)),
  openModal: (modal) => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  removeServerSubs: () => dispatch(removeServerSubs()),
});

export default withRouter(connect(mSTP, mDTP)(ServersNavBar));