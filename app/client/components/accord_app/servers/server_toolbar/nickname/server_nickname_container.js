import { withRouter } from '@utils';
import { connect } from 'react-redux';
import { closeModal } from '../../../../../actions/ui_actions';
import { updateNickname } from '../../../../../actions/membership_actions';
import ServerNickname from './server_nickname';
import { currentUsersMembershipId } from '@selectors';

const mSTP = (state, ownProps) => {
  const server = state.entities.servers[ownProps.location.pathname.split('/')[2]];
  const membershipsState = state.entities.memberships;
  const usersState = state.entities.users;
  const currentUser = state.entities.users[state.session.id];
  const currentUserCopy = Object.assign({}, currentUser);
  currentUserCopy.membership = state.entities.memberships[
    currentUsersMembershipId(
      currentUser.id,
      usersState,
      server,
      membershipsState,
    )
  ];
  const serverSub = state.subscriptions.servers[server.id];

  return {
    currentUser: currentUserCopy,
    serverSub,
  };
};

const mDTP = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    updateNickname: (membership) => dispatch(updateNickname(membership)),

  };
};

export default withRouter(connect(mSTP, mDTP)(ServerNickname));