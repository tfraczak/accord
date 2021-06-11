import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { serverInvites } from '../../../../../../utils/selectors';
import ServerSettingsInvites from './server_settings_invites';
import { deleteInvite } from '../../../../../../actions/invitation_actions';

const mSTP = (state, ownProps) => {
    const server = state.entities.servers[ownProps.location.pathname.split("/")[2]];
    const currentUser = state.entities.users[state.session.id];
    return {
        serverInvites: serverInvites(
            server,
            state.entities.invitations
        ),
        server,
        isOwner: server.ownerId === currentUser.id,
    }
};

const mDTP = dispatch => ({
    deleteInvite: invite => dispatch(deleteInvite(invite))
});

export default withRouter(connect(mSTP, mDTP)(ServerSettingsInvites));