import React from "react";
import LoginFormContainer from './session/login_form_container';
import RegisterFormContainer from './session/register_form_container';
import { Route } from "react-router-dom";
// import { AuthRoute } from '../utils/route_utils';

const App = () => (
    <div className="app-wrapper">
        <header className="header-wrapper">
            <h1>Accord</h1>
        </header>
        <Route 
            path="/login"
            component={LoginFormContainer}/>
        <Route
            path="/register"
            component={RegisterFormContainer}/>
    </div>
);

export default App;