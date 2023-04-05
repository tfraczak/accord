import { connect } from 'react-redux';
import { withRouter } from '@utils';
import ConversationsIndex from './conversations_index';
// import { openModal } from '../../../../actions/ui_actions';
// import { removeConversation } from '../../../../actions/conversation_actions';

const mSTP = (state, ownProps) => {
  const conversations = Object.values(Object.assign({}, state.entities.conversations));
  const currentUserId = state.session.id;
  return {
    conversations,
    currentUserId,
  };
};

const mDTP = (dispatch) => ({
  // removeConversation: conversationId => dispatch(removeConversation(conversationId)),
});

export default withRouter(connect(mSTP, mDTP)(ConversationsIndex));