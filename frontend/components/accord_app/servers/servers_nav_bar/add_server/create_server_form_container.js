import React from 'react';
import { connect } from 'react-redux';
import { createServer } from '../../../../../actions/server_actions';
import { closeModal, openModal } from '../../../../../actions/ui_actions';
import AddServerForm from './add_server_form';

const mSTP = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    submitObj: {
      input: `${state.entities.users[state.session.id].username}'s server`
    },
    formType: "create",
    inputLabel: (<h3 className="server-form-input-label">SERVER NAME</h3>),
    formTitle: "Create a server",
    formSubtitle: (
        <>
            <p>Give your new server a personality with a name and an icon.</p>
            <p>You can always change it later.</p>
        </>
    ),
    inputPlaceholder: null,
    formFooter: (<h3 className="asf-create-footer">Have an invite already?</h3>),
    errors: state.errors,

});

const mDTP = dispatch => ({
    processForm: server => dispatch(createServer(server)),
    closeModal: () => dispatch(closeModal()),
    otherForm: (
        <button type="button" className="asf-to-join" onClick={() => dispatch(openModal('join server'))}>
            Join a Server
        </button>
    ),
});

export default connect(mSTP, mDTP)(AddServerForm);