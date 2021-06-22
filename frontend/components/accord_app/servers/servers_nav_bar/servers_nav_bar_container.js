import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import * as ServerActions from '../../../../actions/server_actions';
import ServersNavBar from "./servers_nav_bar";
import { openModal, closeModal } from "../../../../actions/ui_actions";
import { removeServerSubs } from "../../../../actions/socket_actions";


const mSTP = (state, ownProps) => {
    
    return {
        servers: Object.values(state.entities.servers),
        currentUserId: state.session.id,
        invitedServer: state.session.invitedServer,
    }
};

const mDTP = (dispatch, ownProps) => ({
    createServer: server => dispatch(ServerActions.createServer(server)),
    updateServer: server => dispatch(ServerActions.updateServer(server)),
    deleteServer: serverId => dispatch(ServerActions.deleteServer(serverId)),
    // joinServer: membership => dispatch(ServerActions.joinServer(membership)),
    leaveServer: (membershipId) => dispatch(ServerActions.leaveServer(membershipId)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    removeServerSubs: () => dispatch(removeServerSubs()),
});

export default withRouter(connect(mSTP, mDTP)(ServersNavBar));