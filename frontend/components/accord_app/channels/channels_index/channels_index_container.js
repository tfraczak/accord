import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelsIndex from './channels_index';
import { serverChannels } from '../../../../utils/selectors';
import { openFullModal, openModal } from '../../../../actions/ui_actions';

const mSTP = (state, ownProps) => {
    const server = state.entities.servers[ownProps.match.params.serverId];
    const channels = serverChannels(server, state.entities.channels);
    const currentUserId = state.session.id;
    
    return {
        channels,
        server,
        currentUserId,
    }
};

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal)),
    openFullModal: (modal, object) => dispatch(openFullModal(modal, object)),
});

export default withRouter(connect(mSTP, mDTP)(ChannelsIndex));