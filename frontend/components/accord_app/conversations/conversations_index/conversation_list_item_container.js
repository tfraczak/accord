import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ConversationListItem from './conversation_list_item';
import { conversationMembers } from '../../../../utils/selectors';

const mSTP = (state, ownProps) => {
  const convoMembers = conversationMembers(
    state.entities.users,
    ownProps.conversation,
    state.entities.memberships
  );
  return {
    convoMembers,
    users: state.entities.users,
  };
};

const mDTP = dispatch => ({
    
});

export default withRouter(connect(mSTP, mDTP)(ConversationListItem));