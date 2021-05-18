import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { serverMembers } from '../../../../utils/selectors';
import ServerMembersList from './server_members_list';

const mSTP = (state, ownProps) => {
    const users = state.entities.users;
    const server = state.entities.servers[ownProps.match.params.serverId];
    const memberships = state.entities.memberships;
    return {
        serverMembers: serverMembers(users, server, memberships),
        server,
    }
};

const mDTP = dispatch => ({
    nothing: null,
});

export default withRouter(connect(mSTP, mDTP)(ServerMembersList));