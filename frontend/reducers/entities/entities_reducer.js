import users from "./users_reducer";
import servers from "./servers_reducer";
import invitations from "./invitations_reducer";
import memberships from "./memberships_reducer";
import channels from "./channels_reducer";
import { combineReducers } from 'redux';

export default combineReducers({
    servers,
    users,
    invitations,
    memberships,
    channels,
});