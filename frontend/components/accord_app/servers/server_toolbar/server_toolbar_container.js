import { connect } from "react-redux";
import * as ServerActions from '../../../../actions/server_actions';
import * as UserActions from '../../../../actions/user_actions';
import ServerToolbar from "./servers_nav_bar";

const mSTP = (state, ownProps) => {
    const server = state.entities.servers[ownProps.math.params.serverId];
    const currentUserId = state.session.id;
    const membershipId = server.memberships[currentUserId].id;
    return {
        server,
        currentUserId,
        membershipId,
    };
};

const mDTP = (dispatch, ownProps) => ({
    leaveServer: (membershipId, currentUserId, userId=null) => dispatch(ServerActions.leaveServer((membershipId, currentUserId, userId=null))),
    createInvite: (serverId, expiration) => dispatch(ServerActions.createInvite((serverId, expiration))),
    deleteServer: serverId => dispatch(ServerActions.deleteServer(serverId)),
    updateServer: server => dispatch(ServerActions.updateServer(server)),
});

export default connect(mSTP, mDTP)(ServerToolbar);