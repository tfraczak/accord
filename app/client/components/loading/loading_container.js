import Loading from './loading';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { _retrieveUserLoadData } from '../../actions/session_actions';
import { createSessionSub } from '../../utils/socket_utils';
import { receiveSessionSub } from '../../actions/socket_actions';

const mSTP = (state, ownProps) => {
  const loadingMsgs = [
    'Hacking into the mainframe...',
    'Aright boss, gettin\' your stuff...',
    'Fetching all your data...',
    'Splendid show, my dear! Let me retrieve your data!',
  ];

  const pickLoadingMsg = () => {
    const i = Math.floor(Math.random() * loadingMsgs.length);
    return loadingMsgs[i];
  };

  const loadingMsg = pickLoadingMsg();

  const sessionSub = state.subscriptions.session;

  return {
    currentUserId: state.session.id,
    currentUser: state.entities.users[state.session.id],
    loadingMsg,
    sessionSub,
  };
};

const mDTP = (dispatch) => ({
  retrieveUserLoadData: (userId) => dispatch(_retrieveUserLoadData(userId)),
  createSessionSub: (currentUserId) => createSessionSub(currentUserId, dispatch),
  receiveSessionSub: (sessionSub) => dispatch(receiveSessionSub(sessionSub)),
});

export default withRouter(connect(mSTP, mDTP)(Loading));