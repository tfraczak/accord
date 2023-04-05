import { withRouter } from '@utils';
import { connect } from 'react-redux';
import FocusRight from './focus_right';
import { serverMembers } from '@selectors';

const mSTP = (state, ownProps) => {
  let server, members;
  let usersState = state.entities.users;
  let memsState = state.entities.memberships;
  if (!(ownProps.location.pathname.split('/')[2] === '@me')) {
    server = state.entities.servers[ownProps.location.pathname.split('/')[2]];
    members = serverMembers(usersState, server, memsState);
  }
  let createdConvo = state.session.conversation;
  return {
    server,
    members,
    createdConvo,
  };
};

const mDTP = (dispatch) => {
  return {};
};

export default withRouter(connect(mSTP, mDTP)(FocusRight));