import {
    RECEIVE_MEMBERSHIP,
    RECEIVE_MEMBERSHIPS,
    REMOVE_MEMBERSHIP,
} from "../../actions/membership_actions";


export default (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_MEMBERSHIPS:
            return Object.assign({}, state, action.memberships );
        case RECEIVE_MEMBERSHIP:
            const type = action.membership.joinableType;
            const memberships = {
                [type]: {
                    [action.membership.serverId]: {
                        [action.membership.userId]: {
                            memebrshipId: action.membership.id,
                            localUsername: action.membership.localUsername,
                        }
                    }
                }
            }
            return Object.assign({}, ...state, ...memberships);
        case REMOVE_MEMBERSHIP:
            nextState = Object.assign({}, state);
            delete nextState[action.membership.userId][action.membership.id];
            return  nextState;
        default:
            return state;
    }
};