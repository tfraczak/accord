import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CurrentUserDisplay from './current_user_display';
import { logout } from '../../../actions/session_actions';

const mSTP = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
});

export default withRouter(connect(mSTP, mDTP)(CurrentUserDisplay));