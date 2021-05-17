import { connect } from 'react-redux';
import { serverMembers } from '../../../../utils/selectors';
import ServerMembersList from './server_members_list';

const mSTP = (state, ownProps) => {
    const users = state.entities.users;
    const server = state.entities.servers[ownProps.match.params.serverId];
    const memberships = server.memberships;
    return {
        serverMembers: serverMembers(users, memberships),
    }
};

const mDTP = dispatch => ({
    nothing: null,
});

export default connect(mSTP, mDTP)(ServerMembersList);