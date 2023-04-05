import React from 'react';
import { withRouter } from '@utils';
import { connect } from 'react-redux';
import { closeModal } from '../../../../../actions/ui_actions';

import { createChannel } from '../../../../../actions/channel_actions';

import CreateChannel from './create_channel';

const mSTP = (state, ownProps) => {
  const server = state.entities.servers[ownProps.match.params.serverId];
  // if (!server) return ownProps.history.push("/channels/@me");
  const serverSub = state.subscriptions.servers[server.id];
  return {
    currentUser: state.entities.users[state.session.id],
    server,
    serverSub,
    submitObj: {
      name: '',
      mediaType: 'Text',
      serverId: server.id,
    },
    formType: 'create',
    formTitle: 'Create Text Channel',
    formSubtitle: (<p>in Text Channels</p>),
    inputPlaceholder: '# new-channel',
  };
};

const mDTP = (dispatch) => ({ closeModal: () => dispatch(closeModal()) });

export default withRouter(connect(mSTP, mDTP)(CreateChannel));