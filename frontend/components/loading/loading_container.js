import Loading from "./loading";
import { connect } from "react-redux";
import { _retrieveUserLoadData } from '../../actions/session_actions';

const mSTP = (state, ownProps) => ({
    currentUserId: state.session.id,
    currentUser: state.entities.users[state.session.id],
});

const mDTP = (dispatch) => ({
    retrieveUserLoadData: (userId, history) => dispatch(_retrieveUserLoadData(userId, history)),
});

export default connect(mSTP, mDTP)(Loading);