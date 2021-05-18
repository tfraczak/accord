import React from 'react';
import { Link } from 'react-router-dom';
import SessionForm from "./session_form";
import { connect } from "react-redux";
import { register, removeErrors } from "../../actions/session_actions";

const mSTP = (state, ownProps) => ({
    user: {
        email: "",
        username: "",
        password: "",
    },
    errors: state.errors.session,
    formTitle: "Create an account",
    formButtonText: "Continue",
    formFooterTOS: () => <Link to="/terms">Terms of Service</Link>,
    formFooterPrivacy: () => <Link to="/privacy">Privacy Policy</Link>,
    formType: "register",
});

const mDTP = (dispatch, ownProps) => ({
    processForm: user => dispatch(register(user)),
    removeErrors: () => dispatch(removeErrors()),
});

export default connect(mSTP, mDTP)(SessionForm);