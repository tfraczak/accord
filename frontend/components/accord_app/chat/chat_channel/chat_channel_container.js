import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ChannelChat from './chat_channel';

const mSTP = (state, ownProps) => {

    return {
        message: null
    }
};

const mDTP = dispatch => {

    return null;
};

export default withRouter(connect(mSTP, mDTP)(ChannelChat));