import { combineReducers } from 'redux';
// import chats from './chat_sub_reducer';
import servers from './servers_sub_reducer';
import session from './session_sub_reducer';

export default combineReducers({
    // chats,
    servers,
    session,
});