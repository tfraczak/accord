import React from 'react';
import LoginFormContainer from './session/login_form_container';
import RegisterFormContainer from './session/register_form_container';
import SplashContainer from './landing/splash_container';
import AccordAppContainer from './accord_app/accord_app_container';
import LoadingContainer from './loading/loading_container';
import Error404 from './error_404/error_404';
import UrlInvitationContainer from './url_invitation/url_invitation_container';
import { Route, Routes } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';

const App = () => {
  return (
    <div className="app-wrapper">
      <Routes>
        <ProtectedRoute path="/app" component={LoadingContainer} />
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/register" component={RegisterFormContainer} />
        <Route path="/404" element={<Error404 />} />
        <ProtectedRoute path="/channels" component={AccordAppContainer} />
        <ProtectedRoute path="/:urlToken" component={UrlInvitationContainer} />
        <Route path="/" element={<SplashContainer />}/>
        <Route element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;