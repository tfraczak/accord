import React from "react";
import LoginFormContainer from './session/login_form_container';
import RegisterFormContainer from './session/register_form_container';
import SplashContainer from './landing/splash_container';
import Error404 from './error_404/error_404';
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';

const App = () => (
    <div className="app-wrapper">
        <Switch>
            <Route exact path="/">
                <SplashContainer />
            </Route>
            <Route exact path="/login">
                <AuthRoute exact path="/login" component={LoginFormContainer} />
            </Route>
            <Route exact path="/register">
                <AuthRoute exact path="/register" component={RegisterFormContainer} />
            </Route>
            {/* <ProtectedRoute exact path="/app">
                <LoadingContainer />
            </ProtectedRoute>
            <ProtectedRoute path="/channels">
                <ChatContainer />
            </ProtectedRoute> */}
            <Route>
                <Error404 />
            </Route>
        </Switch>
    </div>
);

export default App;