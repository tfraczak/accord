import { connect } from 'react-redux';
import { withRouter } from '@utils';
import ConversationsIndex from './conversations_index';

const mSTP = (state, ownProps) => {
  const conversations = Object.values(Object.assign({}, state.entities.conversations));
  const currentUserId = state.session.id;
  return {
    conversations,
    currentUserId,
  };
};

const mDTP = (dispatch) => ({});

export default withRouter(connect(mSTP, mDTP)(ConversationsIndex));