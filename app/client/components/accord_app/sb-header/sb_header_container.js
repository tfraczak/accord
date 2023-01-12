import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SbHeader from './sb_header';

const mSTP = (state, ownProps) => {
    
    return {
        serverId: ownProps.match.params.serverId,
    }
};

const mDTP = dispatch => {
    return {};
};

export default withRouter(connect(mSTP, mDTP)(SbHeader));