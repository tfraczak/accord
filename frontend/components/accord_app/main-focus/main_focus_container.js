import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MainFocus from './main_focus';

const mSTP = (state, ownProps) => {
    let serverId = parseInt(ownProps.location.pathname.split("/")[2]);
    let channelId = parseInt(ownProps.location.pathname.split("/")[3]);
    let channel = state.entities.channels[channelId];
    let server = state.entities.servers[serverId];
    return {
        chatId: ownProps.match.params.channelId || ownProps.match.params.conversationId,
    }
};

const mDTP = dispatch => {
    return {};
};

export default withRouter(connect(mSTP, mDTP)(MainFocus));