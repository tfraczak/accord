import React from 'react';
import { Link } from 'react-router-dom';
import SessionForm from "./session_form";
import { connect } from "react-redux";
import { register } from "../../actions/session_actions";

const mSTP = (state, ownProps) => ({
    user: {
        email: "",
        username: "",
        password: "",
    },
    errors: state.errors.session,
    formTitle: "Create an account",
    formButtonText: "Continue",
    formFooterLink: () => <Link className="to-login" to="/login">Already have an account?</Link>,
    formFooterTOS: () => <Link to="/terms">Terms of Service</Link>,
    formFooterPrivacy: () => <Link to="/privacy">Privacy Policy</Link>
});

const mDTP = (dispatch, ownProps) => ({
    processForm: user => dispatch(register(user)),
});

export default connect(mSTP, mDTP)(SessionForm);