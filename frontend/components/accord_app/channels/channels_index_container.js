import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelsIndex from './channels_index';
import { serverChannels } from '../../../utils/selectors';

const mSTP = (state, ownProps) => {
    const server = state.entities.servers[ownProps.match.params.serverId];
    const channels = serverChannels(server, state.entities.channels);
    
    return {
        channels,
        server,
    }
};

const mDTP = dispatch => ({
    nothing: null,
});

export default withRouter(connect(mSTP, mDTP)(ChannelsIndex));