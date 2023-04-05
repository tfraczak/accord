import { connect } from 'react-redux';
import { withRouter } from '@utils';
import AccordApp from './accord_app';

const mSTP = (state, ownProps) => {
  let serverId = parseInt(ownProps.location.pathname.split('/')[2]);
  let channelId = parseInt(ownProps.location.pathname.split('/')[3]);
  let convoId = parseInt(ownProps.location.pathname.split('/')[3]);
  return {
    servers: Object.values(state.entities.servers),
    currentUserId: state.session.id,
    invitedServer: state.session.invitedServer,
    channelId,
    serverId,
    convoId,
  };
};

const mDTP = (dispatch) => ({});

export default withRouter(connect(mSTP, mDTP)(AccordApp));