import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateServer, deleteServer } from '../../../../../actions/server_actions';
import { retrieveServerInvites } from '../../../../../actions/invitation_actions';
import { retrieveServerMembers } from '../../../../../actions/user_actions';
import { closeModal } from '../../../../../actions/ui_actions';
import ServerSettings from './server_settings';

const mSTP = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.id];
    const server = state.entities.servers[ownProps.location.pathname.split("/")[2]];
    if (!server) return {};
    const isOwner = currentUser.id === server.ownerId;
    const serverSub = state.subscriptions.servers[server.id];
    return {
        isOwner,
        server,
        currentUser,
        serverSub
    };
};

const mDTP = dispatch => ({
    updateServer: (server, serverId) => dispatch(updateServer(server, serverId)),
    deleteServer: server => dispatch(deleteServer(server)),
    retrieveServerInvites: serverId => dispatch(retrieveServerInvites(serverId)),
    retrieveServerMembers: serverId => dispatch(retrieveServerMembers(serverId)),
    closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(mSTP, mDTP)(ServerSettings));