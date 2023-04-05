import React from 'react';
import { withRouter } from '@utils';
import { connect } from 'react-redux';

import {
  getServerByJoinForm,
  removeServerErrors,
  receiveServerErrors,
} from '../../../../../actions/server_actions';

import { closeModal, openModal } from '../../../../../actions/ui_actions';

import AddServerForm from './add_server_form';

const mSTP = (state, ownProps) => {
  const serverSubs = state.subscriptions.servers;
  return {
    currentUser: state.entities.users[state.session.id],
    submitObj: { input: '' },
    formType: 'join',
    formTitle: 'Join a Server',
    formSubtitle: (
      <>
        <p>Enter an invite below to join an existing server</p>
      </>
    ),
    inputPlaceholder: 'https://accord.com/Ia78S8gyoQ',
    formFooter: (
      <div className="asf-footer-wrapper">
        <h6 className="invites-examples-title" >invites should look like</h6>
        <ul className="invites-examples-list">
          <li key="join-ex-1">Ia78S8gyoQ</li>
          <li key="join-ex-2">https://accord.com/Ia78S8gyoQ</li>
        </ul>
      </div>
    ),
    serverErrors: state.errors.servers,
    serverSubs,
  };
};

const mDTP = (dispatch) => ({
  processForm: (urlToken, currentUserId) => dispatch(getServerByJoinForm(urlToken, currentUserId)),
  closeModal: () => dispatch(closeModal()),
  otherForm: (
    <button type="button" className="asf-to-create" onClick={() => dispatch(openModal('create server'))}>
            Back
    </button>
  ),
  receiveServerErrors: (errors) => dispatch(receiveServerErrors(errors)),
  removeServerErrors: () => dispatch(removeServerErrors()),
});

export default withRouter(connect(mSTP, mDTP)(AddServerForm));