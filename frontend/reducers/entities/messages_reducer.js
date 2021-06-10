import {
    RECEIVE_MESSAGE,
    RECEIVE_MESSAGES,
    REMOVE_MESSAGE,
} from "../../actions/message_actions";
import {
    RECEIVE_SERVER_INFO,
    LEAVE_SERVER,
    REMOVE_SERVER,
    RECEIVE_JOINED_SERVER,
} from "../../actions/server_actions";
import {
    RECEIVE_CHANNEL,
    REMOVE_CHANNEL,
    RECEIVE_CHANNELS,
    RECEIVE_UPDATED_CHANNEL,
} from "../../actions/channel_actions";

import { chatMessages } from "../../utils/selectors";

import { RECEIVE_USER_LOAD_DATA } from '../../actions/session_actions';


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    let message, messages, messageId, messageIds;
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return Object.assign({}, state, action.messages);
        case RECEIVE_USER_LOAD_DATA:
            messages = action.payload.messages;
            return Object.assign({}, state, messages);
        case RECEIVE_SERVER_INFO:
            messages = action.payload.messages;
            return Object.assign({}, state, messages);
        case RECEIVE_MESSAGE:
            return Object.assign({}, state, { [action.message.id]: action.message });
        case REMOVE_MESSAGE:
            nextState = Object.assign({}, state);
            delete nextState[action.message.id];
            return nextState;
        case RECEIVE_CHANNELS:
            messages = action.payload.messages;
            return Object.assign({}, state, messages);
        case RECEIVE_CHANNEL:
            messages = action.payload.messages;
            return Object.assign({}, state, messages);
        case RECEIVE_UPDATED_CHANNEL:
            messages = action.payload.messages;
            return Object.assign({}, state, messages);
        case REMOVE_CHANNEL:
            nextState = Object.assign({}, state);
            messages = chatMessages(action.channel, "Channel", nextState);
            debugger
            for(let message of messages) { delete nextState[message.id] }
            return nextState;
        case RECEIVE_JOINED_SERVER:
            messages = action.payload.messages;
            return Object.assign({}, state, messages);
        case LEAVE_SERVER:
            nextState = Object.assign({}, state);
            messageIds = Object.values(action.payload.messageIds);
            for(let id of messageIds) { delete nextState[id] }
            return nextState;
        case REMOVE_SERVER:
            nextState = Object.assign({}, state);
            messageIds = Object.values(action.payload.messageIds);
            for(let id of messageIds) { delete nextState[id] }
            return nextState;
        default:
            return state;
    }
};