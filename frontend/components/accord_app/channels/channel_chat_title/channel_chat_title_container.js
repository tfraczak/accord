import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelChatTitle from './channel_chat_title';

const mSTP = (state, ownProps) => {
    const channel = state.entities.channels[ownProps.match.params.channelId];
    
    return {
        channel,
    }
};

const mDTP = dispatch => ({
    nothing: null,
});

export default withRouter(connect(mSTP, mDTP)(ChannelChatTitle));