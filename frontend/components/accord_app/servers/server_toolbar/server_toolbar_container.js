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
    const urlToken = state.session.invitation;

    const membershipId = currentUsersMembershipId(
        currentUserId,
        users,
        server,
        memberships
    )
    
    return {
        server,
        currentUserId,
        membershipId,
        urlToken,
    };
};

const mDTP = (dispatch, ownProps) => ({
    leaveServer: (membershipId) => dispatch(ServerActions.leaveServer((membershipId))),
    createInvite: (serverId) => dispatch(InviteActions.createInvite((serverId))),
    deleteServer: (serverId) => dispatch(ServerActions.deleteServer(serverId)),
    updateServer: server => dispatch(ServerActions.updateServer(server)),
    removeInvitation: () => dispatch(InviteActions.removeInvitation()),
});

export default withRouter(connect(mSTP, mDTP)(ServerToolbar));