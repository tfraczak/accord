import React from "react";
import LoginFormContainer from './session/login_form_container';
import RegisterFormContainer from './session/register_form_container';
import SplashContainer from './landing/splash_container';
import { Route } from "react-router-dom";
import { AuthRoute } from '../utils/route_utils';

const App = () => (
    <div className="app-wrapper">
        <SplashContainer />
        <AuthRoute 
            path="/login"
            component={LoginFormContainer}/>
        <AuthRoute
            path="/register"
            component={RegisterFormContainer}/>
    </div>
);

export default App;