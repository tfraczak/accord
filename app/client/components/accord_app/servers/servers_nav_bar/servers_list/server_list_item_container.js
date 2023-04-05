import ServerListItem from './server_list_item';
import { connect } from 'react-redux';
import { withRouter } from '@utils';
import { receiveServerSub } from '../../../../../actions/socket_actions';
import { defaultChannelId } from '@selectors';
import { createServerSub } from '../../../../../utils/socket_utils';
import { receiveServer } from '../../../../../actions/server_actions';

const mSTP = (state, ownProps) => {
  const serverSub = state.subscriptions.servers[ownProps.server.id];
  const currentUser = state.entities.users[state.session.id];
  return {
    defaultChannelId: defaultChannelId(ownProps.server, state.entities.channels),
    serverSub,
    currentUser,
  };
};

const mDTP = (dispatch) => ({
  receiveServerSub: (serverSub) => dispatch(receiveServerSub(serverSub)),
  receiveServer: (server) => dispatch(receiveServer(server)),
  createServerSub: (server, currentUser) => createServerSub(server, currentUser, dispatch),
});

export default withRouter(connect(mSTP, mDTP)(ServerListItem));