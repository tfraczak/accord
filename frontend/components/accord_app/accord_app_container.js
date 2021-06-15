import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import AccordApp from "./accord_app";
import * as ServerActions from '../../actions/server_actions';
import * as UserActions from '../../actions/user_actions';
import { _retrieveUserLoadData } from '../../actions/session_actions';
import { openModal, closeModal } from "../../actions/ui_actions";

const mSTP = (state, ownProps) => {
    let serverId = parseInt(ownProps.location.pathname.split("/")[2]);
    let channelId = parseInt(ownProps.location.pathname.split("/")[3]);
    let channel = state.entities.channels[channelId];
    let server = state.entities.servers[serverId];
    return {
        servers: Object.values(state.entities.servers),
        currentUserId: state.session.id,
        invitedServer: state.session.invitedServer,
        channelId,
        serverId,
    }

};

const mDTP = (dispatch) => ({
    retrieveUserServers: currentUserId => dispatch(ServerActions.retrieveUserServers(currentUserId)),
    createServer: server => dispatch(ServerActions.createServer(server)),
    updateServer: server => dispatch(ServerActions.updateServer(server)),
    deleteServer: serverId => dispatch(ServerActions.deleteServer(serverId)),
    joinServer: membership => dispatch(ServerActions.joinServer(membership)),
    leaveServer: (membershipId) => dispatch(ServerActions.leaveServer(membershipId)),
    retrieveServerMembers: serverId => dispatch(UserActions.retrieveServerMembers(serverId)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(mSTP, mDTP)(AccordApp));