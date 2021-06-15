import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelListItem from './channel_list_item';

const mSTP = (state, ownProps) => {
  return {
    serverId: ownProps.match.params.serverId,
  };
};

const mDTP = dispatch => ({
    
});

export default withRouter(connect(mSTP, mDTP)(ChannelListItem));