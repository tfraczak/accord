import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeModal } from '../../../../../actions/ui_actions';
import { changeNickname } from '../../../../../actions/membership_actions';
import ServerNickname from './server_nickname';
import { currentUsersMembershipId } from './../../../../../utils/selectors';

const mSTP = (state, ownProps) => {
  const server = state.entities.servers[ownProps.location.pathname.split("/")[2]];
  const membershipsState = state.entities.memberships;
  const usersState = state.entities.users;
  const currentUser = state.entities.users[state.session.id];
  const currentUserCopy = Object.assign({}, currentUser);
  currentUserCopy.membership = state.entities.memberships[
    currentUsersMembershipId(
      currentUser.id,
      usersState,
      server,
      membershipsState
    )
  ];
  return {
    currentUser: currentUserCopy,
  };
};

const mDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    changeNickname: membership => dispatch(changeNickname(membership)),
  };
};

export default withRouter(connect(mSTP, mDTP)(ServerNickname));