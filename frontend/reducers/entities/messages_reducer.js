import {
    RECEIVE_MESSAGE,
    RECEIVE_MESSAGES,
    REMOVE_MESSAGE,
} from "../../actions/message_actions";

import { RECEIVE_USER_LOAD_DATA } from '../../actions/session_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return Object.assign({}, state, action.messages);
        case RECEIVE_USER_LOAD_DATA:
            return Object.assign({}, state, action.payload.messages);
        case RECEIVE_MESSAGE:
            return Object.assign({}, state, { [action.message.id]: action.message })
        default:
            return state;
    }
};