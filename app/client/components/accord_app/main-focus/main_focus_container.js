import { withRouter } from '@utils';
import { connect } from 'react-redux';
import MainFocus from './main_focus';
import {
  nextChat,
  conversationMembers,
} from '@selectors';

const mSTP = (state, ownProps) => {
  let nextPath = ownProps.history.location.pathname;
  let next = nextChat(nextPath);
  let convoMembers;
  if (next[0] === 'Conversation') {
    convoMembers = conversationMembers(
      state.entities.users,
      state.entities.conversations[next[1]],
      state.entities.memberships,
    );
  }
  let serverId = parseInt(ownProps.location.pathname.split('/')[2]);
  let channelId = parseInt(ownProps.location.pathname.split('/')[3]);
  let channel = state.entities.channels[channelId];
  let server = state.entities.servers[serverId];
  return {
    chatId: next[1],
    type: next[0],
    convoMembers,
  };
};

const mDTP = (dispatch) => {
  return {};
};

export default withRouter(connect(mSTP, mDTP)(MainFocus));