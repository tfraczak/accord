import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import ServerToolbar from "./server_toolbar";
import * as InviteActions from '../../../../actions/invitation_actions';
import * as ServerActions from '../../../../actions/server_actions';
import { openModal, openFullModal } from '../../../../actions/ui_actions';
import { currentUsersMembershipId } from '../../../../utils/selectors';

const mSTP = (state, ownProps) => {

    const server = state.entities.servers[ownProps.match.params.serverId];
    // if (!server && !ownProps.history.location.pathname.includes("@me")) {
    //     ownProps.history.push("/channels/@me");
    //     return {};
    // }
    const currentUserId = state.session.id;
    const memberships = state.entities.memberships;
    const users = state.entities.users;
    const invitation = state.session.invitation;
    const serverSub = state.subscriptions.servers[server.id];

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
        invitation,
        serverSub
    };
};

const mDTP = (dispatch, ownProps) => ({
    openModal: modal => dispatch(openModal(modal)),
    openFullModal: payload => dispatch(openFullModal(payload)),
    leaveServer: (membershipId) => dispatch(ServerActions.leaveServer((membershipId))),
    createInvite: (serverId) => dispatch(InviteActions.createInvite((serverId))),
    deleteServer: (serverId) => dispatch(ServerActions.deleteServer(serverId)),
    updateServer: server => dispatch(ServerActions.updateServer(server)),
    removeInvitation: () => dispatch(InviteActions.removeInvitation()),
});

export default withRouter(connect(mSTP, mDTP)(ServerToolbar));