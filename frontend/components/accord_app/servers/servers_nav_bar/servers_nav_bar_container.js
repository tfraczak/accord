import { connect } from "react-redux";
import * as ServerActions from '../../../../actions/server_actions';
import * as UserActions from '../../../../actions/user_actions';
import ServersNavBar from "./servers_nav_bar";
import { openModal, closeModal } from "../../../../actions/ui_actions";

const mSTP = (state, ownProps) => ({
    servers: Object.values(state.entities.servers),
    currentUserId: state.session.id,
    invitedServer: state.session.invitedServer,
});

const mDTP = (dispatch, ownProps) => ({
    createServer: server => dispatch(ServerActions.createServer(server)),
    updateServer: server => dispatch(ServerActions.updateServer(server)),
    deleteServer: serverId => dispatch(ServerActions.deleteServer(serverId)),
    joinServer: membership => dispatch(ServerActions.joinServer(membership)),
    leaveServer: (membershipId) => dispatch(ServerActions.leaveServer(membershipId)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
});

export default connect(mSTP, mDTP)(ServersNavBar);