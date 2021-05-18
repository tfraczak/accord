import {
    RECEIVE_CHANNEL,
    RECEIVE_CHANNELS,
    REMOVE_CHANNEL,
} from "../../actions/channel_actions";



export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return Object.assign({}, state, action.channels );
        case RECEIVE_CHANNEL:
            return Object.assign({}, state, { [action.channel.id]: action.channel });
        case REMOVE_CHANNEL:
            nextState = Object.assign({}, state);
            delete nextState[action.payload.channelId];
            return  nextState;
        default:
            return state;
    }
};