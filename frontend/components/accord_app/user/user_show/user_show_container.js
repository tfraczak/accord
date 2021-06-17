import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeModal } from '../../../../actions/ui_actions';
import { createConversation, removeCreatedConvo } from '../../../../actions/conversation_actions';
import { commonServers } from '../../../../utils/selectors';

import UserShow from './user_show';

const mSTP = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.id];
  const sessionSub = state.subscriptions.session;
  const mutualServers = commonServers(
    currentUser,
    ownProps.user,
    state.entities.memberships,
    state.entities.servers
  );
  const createdConvo = state.session.conversation;
  return {
      currentUser,
      sessionSub,
      mutualServers,
      createdConvo,
  };
};

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    createConversation: conversation => dispatch(createConversation(conversation)),
    removeCreatedConvo: () => dispatch(removeCreatedConvo()),
});

export default withRouter(connect(mSTP, mDTP)(UserShow));