import React from "react";
import LoginFormContainer from './session/login_form_container';
import RegisterFormContainer from './session/register_form_container';
import SplashContainer from './landing/splash_container';
import AccordAppContainer from './accord_app/accord_app_container';
import LoadingContainer from './loading/loading_container';
import Error404 from './error_404/error_404';
import AddServerModal from './accord_app/servers/server_modals/add_server_modal';
import UrlInvitationContainer from "./url_invitation/url_invitation_container";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';

const App = () => (
    <div className="app-wrapper">
        <AddServerModal />
        <Switch>
            <ProtectedRoute path="/channels" component={AccordAppContainer} />
            <ProtectedRoute exact path="/app" component={LoadingContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/register" component={RegisterFormContainer} />
            <Route exact path="/" component={SplashContainer}/>
            <Route exact path="/404" component={Error404} />
            <ProtectedRoute path="/" component={UrlInvitationContainer} />
            <Route component={Error404} />
        </Switch>
    </div>
);

export default App;