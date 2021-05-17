import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import * as InviteActions from '../../../../actions/invitation_actions';
import * as ServerActions from '../../../../actions/server_actions';
import ServerToolbar from "./server_toolbar";
import { currentUsersMembershipId } from '../../../../utils/selectors';

const mSTP = (state, ownProps) => {

    const server = state.entities.servers[ownProps.match.params.serverId];
    const currentUserId = state.session.id;
    const memberships = state.entities.memberships;
    const users = state.entities.users;

    const membershipId = currentUsersMembershipId(
        currentUserId,
        users,
        server,
        memberships
    )
    debugger
    return {
        server,
        currentUserId,
        membershipId,
    };
};

const mDTP = (dispatch, ownProps) => ({
    leaveServer: (membershipId) => dispatch(ServerActions.leaveServer((membershipId))),
    createInvite: (serverId, expiration) => dispatch(InviteActions.createInvite((serverId, expiration))),
    deleteServer: serverId => dispatch(ServerActions.deleteServer(serverId)),
    updateServer: server => dispatch(ServerActions.updateServer(server)),
});

export default withRouter(connect(mSTP, mDTP)(ServerToolbar));