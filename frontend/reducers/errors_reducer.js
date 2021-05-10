import sessionErrorsReducer from "../reducers/session_errors_reducer";
import { combineReducers } from 'redux';

export default combineReducers({
    session: sessionErrorsReducer,
});