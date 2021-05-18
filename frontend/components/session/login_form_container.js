import React from 'react';
import { Link } from 'react-router-dom';
import SessionForm from "./session_form";
import { connect } from "react-redux";
import { login, removeErrors } from "../../actions/session_actions";

const mSTP = (state, ownProps) => ({
    user: {
        email: "",
        password: "",
    },
    errors: state.errors.session,
    formTitle: "Welcome back!",
    formSubTitle: () => <h3 className="subtitle">We're so excited to see you again!</h3>,
    formButtonText: "Login",
    formType: "login",
});

const mDTP = (dispatch, ownProps) => ({
    processForm: (user) => dispatch(login(user)),
    removeErrors: () => dispatch(removeErrors()),
});

export default connect(mSTP, mDTP)(SessionForm);