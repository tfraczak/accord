import { connect } from 'react-redux';
import { withRouter } from '@utils';
import { serverMembers } from '@selectors';
import { membersAlphaAsc } from '@helpers';
import ServerSettingsMembers from './server_settings_members';
import { closeModal } from '../../../../../../actions/ui_actions';

const mSTP = (state, ownProps) => {
  const server = state.entities.servers[ownProps.location.pathname.split('/')[2]];
  const serverSub = state.subscriptions.servers[server.id];
  const currentUser = state.entities.users[state.session.id];
  return {
    serverMembers: serverMembers(
      state.entities.users,
      server,
      state.entities.memberships,
    ).sort(membersAlphaAsc),
    server,
    isOwner: server.ownerId === currentUser.id,
    serverSub,
    currentUserId: currentUser.id,
  };
};

const mDTP = (dispatch) => ({ closeModal: () => dispatch(closeModal()) });

export default withRouter(connect(mSTP, mDTP)(ServerSettingsMembers));