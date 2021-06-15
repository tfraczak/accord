import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FocusRight from './focus_right';
import { serverMembers } from '../../../utils/selectors';

const mSTP = (state, ownProps) => {
    let server, members;
    let usersState = state.entities.users;
    let memsState = state.entities.memberships;
    if (!(ownProps.location.pathname.split("/")[2] === "@me")) {
        server = state.entities.servers[ownProps.location.pathname.split("/")[2]];
        members = serverMembers(usersState, server, memsState);
    }
    return {
        server,
        members
    };
};

const mDTP = dispatch => {
    return {};
};

export default withRouter(connect(mSTP, mDTP)(FocusRight));