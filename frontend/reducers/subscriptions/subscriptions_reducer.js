import { combineReducers } from 'redux';
import servers from './servers_sub_reducer';
import session from './session_sub_reducer';

export default combineReducers({ servers, session });