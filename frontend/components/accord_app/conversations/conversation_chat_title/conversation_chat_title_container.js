import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ConversationChatTitle from './conversation_chat_title';
import { conversationMembers } from '../../../../utils/selectors';
import { openModal } from '../../../../actions/ui_actions';

const mSTP = (state, ownProps) => {
    const conversation = state.entities.conversations[ownProps.match.params.conversationId];
    const currentUserId = state.entities.users[state.session.id];
    const users = state.entities.users;
    const convoMembers = conversationMembers(
        users,
        conversation,
        state.entities.memberships
    );
    return {
        conversation,
        users,
        convoMembers,
        currentUserId
    }
};

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal)),
});

export default withRouter(connect(mSTP, mDTP)(ConversationChatTitle));