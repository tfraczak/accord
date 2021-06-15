import ServerListItem from "./server_list_item";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { receiveServerSub } from "../../../../../actions/socket_actions";
import { serverChannels, defaultChannelId } from "../../../../../utils/selectors";
import { createServerSub } from "../../../../../utils/socket_utils";
import { receiveServer } from '../../../../../actions/server_actions';

const mSTP = (state, ownProps) => {
  const channels = serverChannels(ownProps.server, state.entities.channels);
  const serverSub = state.subscriptions.servers[ownProps.server.id];
  const currentUser = state.entities.users[state.session.id];
  return {
      defaultChannelId: defaultChannelId(ownProps.server, state.entities.channels),
      serverSub,
      currentUser,
  }
};

const mDTP = dispatch => ({
  receiveServerSub: serverSub => dispatch(receiveServerSub(serverSub)),
  receiveServer: server => dispatch(receiveServer(server)),
  createServerSub: (server, currentUser, history) => createServerSub(server, dispatch, currentUser, history),
});

export default withRouter(connect(mSTP, mDTP)(ServerListItem));