import UrlInvitation from "./url_invitation";
import { connect } from "react-redux";
import { getServerByUrl, joinServer, retrieveUserServers } from '../../actions/server_actions';
import { validUrlToken, serverInitials } from "../../utils/func_utils";

const mSTP = (state, ownProps) => {
    return {
        currentUserId: state.session.id,
        invitedServer: state.session.invitedServer,
        urlToken: ownProps.location.pathname.slice(-10),
        serverIds: Object.keys(state.entities.servers),
        errors: state.errors.servers,
    }
};

const mDTP = dispatch => {
    return {
        getServerByUrl: urlToken => dispatch(getServerByUrl(urlToken)),
        joinServer: (membership, currentUserId, history, location) => dispatch(joinServer(membership, currentUserId, history, location)),
        retrieveUserServers: userId => dispatch(retrieveUserServers(userId)),
        validUrlToken: validUrlToken,
        serverInitials: serverInitials,
    }
};

export default connect(mSTP, mDTP)(UrlInvitation);