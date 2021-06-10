import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MainFocus from './main_focus';

const mSTP = (state, ownProps) => {
    
    return {
        chatId: ownProps.match.params.channelId || ownProps.match.params.conversationId,
    }
};

const mDTP = dispatch => {
    return {};
};

export default withRouter(connect(mSTP, mDTP)(MainFocus));