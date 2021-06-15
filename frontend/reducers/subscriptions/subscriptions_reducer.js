import { combineReducers } from 'redux';
import chat from './chat_sub_reducer';
import servers from './servers_sub_reducer';

export default combineReducers({
    chat,
    servers,
});