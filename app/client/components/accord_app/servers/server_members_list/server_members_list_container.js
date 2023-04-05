import { connect } from 'react-redux';
import { withRouter } from '@utils';
import ServerMembersList from './server_members_list';
import { serverMembers } from '@selectors';
import { membersAlphaAsc } from '@helpers';
import { openModal } from '../../../../actions/ui_actions';
import { createConversation, removeCreatedConvo } from '../../../../actions/conversation_actions';

const mSTP = (state, ownProps) => {
  const users = state.entities.users;
  const server = state.entities.servers[ownProps.match.params.serverId];
  const memberships = state.entities.memberships;
  const serverSub = state.subscriptions.servers[server.id];
  const currentUserId = state.session.id;
  const currentUser = state.entities.users[currentUserId];
  const createdConvo = state.session.conversation;
  return {
    serverMembers: serverMembers(users, server, memberships).sort(membersAlphaAsc),
    server,
    serverSub,
    currentUser,
    currentUserId,
    createdConvo,
  };
};

const mDTP = (dispatch) => ({
  openModal: (modal) => dispatch(openModal(modal)),
  createConversation: (conversation) => dispatch(createConversation(conversation)),
  removeCreatedConvo: () => dispatch(removeCreatedConvo()),
});

export default withRouter(connect(mSTP, mDTP)(ServerMembersList));