import React from 'react';
import { Link } from 'react-router-dom';
import SessionForm from "./session_form";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions";

const mSTP = (state, ownProps) => ({
    user: {
        email: "",
        password: "",
    },
    errors: state.errors.session,
    formTitle: "Welcome back!",
    formSubTitle: () => <h3 className="session-form subtitle">We're so excited to see you again</h3>,
    formButtonText: "Login",
    formFooterLink: () => (
        <div className="session-form account-inquiryLink">
            <p className="session-form account-inquiry">Need an account?</p>
            <Link className="to-register" to="/register">Register</Link>
        </div>
    ),
});

const mDTP = (dispatch, ownProps) => ({
    processForm: (user) => dispatch(login(user)),
});

export default connect(mSTP, mDTP)(SessionForm);