import React from 'react';
import { connect } from 'react-redux';
import {
  Navigate,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

const withRouter = (Component) => {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  };
};

const Auth = ({ component: Component, path, loggedIn }) => (
  <Route path={path} element={!loggedIn ? <Component /> : <Navigate to="/app" />}/>
);

const Protected = ({ component: Component, path, loggedIn }) => (
  <Route path={path} element={loggedIn ? <Component /> : <Navigate to="/login" />}/>
);

const mSTP = (state) => ({ loggedIn: Boolean(state.session.id) });
export const AuthRoute = withRouter(connect(mSTP, null)(Auth));
export const ProtectedRoute = withRouter(connect(mSTP, null)(Protected));