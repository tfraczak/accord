import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createChannel } from '../../../../../actions/channel_actions';

import { closeModal } from '../../../../../actions/ui_actions';
import CreateChannel from './create_channel';

const mSTP = (state, ownProps) => {
    return {
        currentUser: state.entities.users[state.session.id],
        server: state.entities.servers[ownProps.match.params.serverId],
        submitObj: {
            name: "",
            mediaType: "Text",
            serverId: parseInt(ownProps.match.params.serverId),
        },
        formType: "create",
        formTitle: "Create Text Channel",
        formSubtitle: (<p>in Text Channels</p>),
        inputPlaceholder: "# new-channel",
    }
};

const mDTP = dispatch => ({
    processForm: channel => dispatch(createChannel(channel)),
    closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(mSTP, mDTP)(CreateChannel));