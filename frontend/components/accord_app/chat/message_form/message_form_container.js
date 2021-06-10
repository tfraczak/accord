import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MessageForm from './message_form';

const mSTP = (state, ownProps) => {
    
    return {
        channel: state.entities.channels[ownProps.match.params.channelId]    
    }
};

const mDTP = dispatch => {

    return {};
};

export default withRouter(connect(mSTP, mDTP)(MessageForm));