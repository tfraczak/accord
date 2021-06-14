import Loading from "./loading";
import { connect } from "react-redux";
import { _retrieveUserLoadData } from '../../actions/session_actions';

const mSTP = (state, ownProps) => {
    const loadingMsgs = [
        "Hacking into the mainframe...",
        "Aright boss, gettin' your stuff...",
        "Fetching all your data...",
        "Splendid show, my dear! Let me retrieve your data!",
    ];

    const pickLoadingMsg = () => {
        const i = Math.floor(Math.random() * loadingMsgs.length);
        return loadingMsgs[i];
    }

    const loadingMsg = pickLoadingMsg();

    return {
        currentUserId: state.session.id,
        currentUser: state.entities.users[state.session.id],
        loadingMsg,
    }
};

const mDTP = (dispatch) => ({
    retrieveUserLoadData: userId => dispatch(_retrieveUserLoadData(userId)),
});

export default connect(mSTP, mDTP)(Loading);