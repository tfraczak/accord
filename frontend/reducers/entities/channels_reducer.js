import {
    RECEIVE_CHANNEL,
    RECEIVE_CHANNELS,
    REMOVE_CHANNEL,
    RECEIVE_CREATED_CHANNEL,
    RECEIVE_UPDATED_CHANNEL,
} from "../../actions/channel_actions";

import {
    RECEIVE_NEW_SERVER,
    RECEIVE_JOINED_SERVER,
    RECEIVE_SERVER_INFO,
    LEAVE_SERVER,
    REMOVE_SERVER,
} from "../../actions/server_actions";

import { RECEIVE_USER_LOAD_DATA } from '../../actions/session_actions';



export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    let channel, channels, channelId, channelIds;
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return Object.assign({}, state, action.channels );
        case RECEIVE_USER_LOAD_DATA:
            return Object.assign({}, state, action.payload.channels );
        case RECEIVE_CHANNEL:
            channel = action.payload.channel;
            return Object.assign({}, state, { [channel.id]: channel });
        case RECEIVE_CREATED_CHANNEL:
            return Object.assign({}, state, { [action.channel.id]: action.channel });
        case RECEIVE_UPDATED_CHANNEL:
            channel = action.payload.channel;
            return Object.assign({}, state, { [channel.id]: channel });
        case REMOVE_CHANNEL:
            nextState = Object.assign({}, state);
            debugger
            delete nextState[action.channel.id];
            return nextState;
        case RECEIVE_NEW_SERVER:
            channel = action.payload.channel;
            return Object.assign({}, state, { [channel.id]: channel });
        case RECEIVE_JOINED_SERVER:
            channels = action.payload.channels;
            return Object.assign({}, state, channels);
        case RECEIVE_SERVER_INFO:
            channels = action.payload.channels;
            return Object.assign({}, state, channels);
        case LEAVE_SERVER:
            nextState = Object.assign({}, state);
            channelIds = Object.values(action.payload.channelIds);
            for(let id of channelIds) { delete nextState[id] }
            return nextState;
        case REMOVE_SERVER:
            nextState = Object.assign({}, state);
            channelIds = Object.values(action.payload.channelIds);
            for(let id of channelIds) { delete nextState[id] }
            return nextState;
        default:
            return state;
    }
};