import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelsIndex from './channels_index';
import { serverChannels } from '../../../../utils/selectors';
import { openFullModal, openModal } from '../../../../actions/ui_actions';
import { receiveChatSub, removeChatSubs } from '../../../../actions/socket_actions';
import { createChatSub } from '../../../../utils/socket_utils';

const mSTP = (state, ownProps) => {
    const server = state.entities.servers[ownProps.match.params.serverId];
    const channels = serverChannels(server, state.entities.channels);
    const currentUserId = state.session.id;
    const chatSubs = state.subscriptions.chats;
    return {
        channels,
        server,
        currentUserId,
        chatSubs,
    }
};

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal)),
    openFullModal: (modal, object) => dispatch(openFullModal(modal, object)),
    createChatSub: (chat, type) => createChatSub(chat, type, dispatch),
    receiveChatSub: chat => dispatch(receiveChatSub(chat)),
    removeChatSubs: () => dispatch(removeChatSubs()),
});

export default withRouter(connect(mSTP, mDTP)(ChannelsIndex));