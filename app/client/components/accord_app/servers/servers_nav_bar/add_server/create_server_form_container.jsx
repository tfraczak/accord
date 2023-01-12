import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  createServer,
  removeServerErrors,
  receiveServerErrors,
} from '../../../../../actions/server_actions';

import { closeModal, openModal } from '../../../../../actions/ui_actions';
import AddServerForm from './add_server_form';

const mSTP = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  submitObj: {
    input: `${state.entities.users[state.session.id].username}'s server`,
    imageFile: null,
    imageUrl: '',
  },
  formType: 'create',
  formTitle: 'Create a server',
  formSubtitle: (
    <>
      <p>Give your new server a personality with a name and an icon.</p>
      <p>You can always change it later.</p>
    </>
  ),
  inputPlaceholder: null,
  formFooter: (<h3 className="asf-create-footer">Have an invite already?</h3>),
  serverErrors: state.errors.servers,

});

const mDTP = (dispatch) => ({
  processForm: (server) => dispatch(createServer(server)),
  closeModal: () => dispatch(closeModal()),
  otherForm: (
    <button type="button" className="asf-to-join" onClick={() => dispatch(openModal('join server'))}>
            Join a Server
    </button>
  ),
  receiveServerErrors: (errors) => dispatch(receiveServerErrors(errors)),
  removeServerErrors: () => dispatch(removeServerErrors()),
});

export default withRouter(connect(mSTP, mDTP)(AddServerForm));