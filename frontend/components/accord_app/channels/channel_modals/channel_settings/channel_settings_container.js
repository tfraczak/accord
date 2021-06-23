import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateChannel, deleteChannel } from '../../../../../actions/channel_actions';
import { closeModal } from '../../../../../actions/ui_actions';
import ChannelSettings from './channel_settings';
import { defaultChannelId } from '../../../../../utils/selectors';

const mSTP = (state, ownProps) => {
    const server = state.entities.servers[ownProps.match.params.serverId];
    // if (!server) return ownProps.history.push("/channels/@me");
    const currentUser = state.entities.users[state.session.id];
    const defChannelId = defaultChannelId(server, state.entities.channels);
    const serverSub = state.subscriptions.servers[server.id];
    return {
        defChannelId,
        serverId: server.id,
        currentUser,
        channel: Object.assign({}, ownProps.channel),
        serverSub,
    };
};

const mDTP = dispatch => ({
    updateChannel: channel => dispatch(updateChannel(channel)),
    deleteChannel: channel => dispatch(deleteChannel(channel)),
    closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(mSTP, mDTP)(ChannelSettings));