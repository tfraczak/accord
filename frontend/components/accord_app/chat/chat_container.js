import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Chat from './chat';

const mSTP = (state, ownProps) => {
    return {
        chat: state.entities.channels[ownProps.match.params.channelId],
        type: "Channel",
        currentUserId: state.session.id,
    }
};

const mDTP = dispatch => {

    return {};
};

export default withRouter(connect(mSTP, mDTP)(Chat));