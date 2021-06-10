import { connect } from "react-redux";
import ConversationMembersList from './conversation_members_list';

const mSTP = (state, ownProps) => ({
    mSTP: null,
});

const mDTP = (dispatch, ownProps) => ({
    mDTP: null,
});

export default connect(mSTP, mDTP)(ConversationMembersList);