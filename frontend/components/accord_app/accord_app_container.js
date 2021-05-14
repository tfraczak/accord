import { connect } from "react-redux";
import * as ServerActions from '../../actions/server_actions';
import * as UserActions from '../../actions/user_actions';
import AccordApp from "./accord_app";

const mSTP = (state, ownProps) => ({
    servers: Object.values(state.entities.servers),
    currentUserId: state.session.id,
});

const mDTP = (dispatch, ownProps) => ({
    retrieveUserServers: currentUserId => dispatch(ServerActions.retrieveUserServers(currentUserId)),
    createServer: server => dispatch(ServerActions.createServer(server)),
    updateServer: server => dispatch(ServerActions.updateServer(server)),
    deleteServer: serverId => dispatch(ServerActions.deleteServer(serverId)),
    joinServer: membership => dispatch(ServerActions.joinServer(membership)),
    leaveServer: (membershipId, currentUserId, userId=null) => dispatch(ServerActions.leaveServer(membershipId, currentUserId, userId)),
    retrieveServerMembers: serverId => dispatch(UserActions.retrieveServerMembers(serverId)),
});

export default connect(mSTP, mDTP)(AccordApp);