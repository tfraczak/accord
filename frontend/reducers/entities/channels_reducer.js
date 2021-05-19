import {
    RECEIVE_CHANNEL,
    RECEIVE_CHANNELS,
    REMOVE_CHANNEL,
} from "../../actions/channel_actions";

import {
    RECEIVE_NEW_SERVER,
    RECEIVE_JOINED_SERVER,
} from "../../actions/server_actions";

import { RECEIVE_USER_LOAD_DATA } from '../../actions/session_actions';



export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    let channel;
    let channels;
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return Object.assign({}, state, action.channels );
        case RECEIVE_USER_LOAD_DATA:
            
            return Object.assign({}, state, action.payload.channels );
        case RECEIVE_CHANNEL:
            return Object.assign({}, state, { [action.channel.id]: action.channel });
        case REMOVE_CHANNEL:
            nextState = Object.assign({}, state);
            delete nextState[action.payload.channelId];
            return nextState;
        case RECEIVE_NEW_SERVER:
            channel = action.payload.channel;
            return Object.assign({}, state, { [channel.id]: channel });
        case RECEIVE_JOINED_SERVER:
            channels = action.payload.channels;
            return Object.assign({}, state, channels );
        default:
            return state;
    }
};