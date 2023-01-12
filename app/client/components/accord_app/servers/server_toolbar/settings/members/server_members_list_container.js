import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { serverMembers } from '../../../../../../utils/selectors';
import { membersAlphaAsc } from '../../../../../../utils/func_utils';
import ServerSettingsMembers from './server_settings_members';
import { kickMember, updateServer } from '../../../../../../actions/server_actions';
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

const mDTP = (dispatch) => ({
  kickMember: (membershipId) => dispatch(kickMember(membershipId)),
  transferOwnership: (formData, serverId) => dispatch(updateServer(formData, serverId)),
  closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(mSTP, mDTP)(ServerSettingsMembers));