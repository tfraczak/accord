import React from 'react';
import { Link } from 'react-router-dom';
import SessionForm from "./session_form";
import { connect } from "react-redux";
import { register, removeErrors } from "../../actions/session_actions";
import { assign } from 'lodash';

const mSTP = (state, ownProps) => ({
    user: {
        email: "",
        username: "",
        password: "",
    },
    errors: state.errors.session,
    formTitle: "Create an account",
    formButtonText: "Continue",
    formFooterTOS: () => <a href="https://github.com/tfraczak" target="_blank">GitHub</a>,
    formFooterPrivacy: () => <a href="https://www.linkedin.com/in/timothy-fraczak-e-i-t-1393a183/" target="_blank">LinkedIn</a>,
    formType: "register",
});

const mDTP = (dispatch, ownProps) => ({
    processForm: user => dispatch(register(user)),
    removeErrors: () => dispatch(removeErrors()),
});

export default connect(mSTP, mDTP)(SessionForm);