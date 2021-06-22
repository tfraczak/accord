import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import AccordApp from "./accord_app";

const mSTP = (state, ownProps) => {
    let serverId = parseInt(ownProps.location.pathname.split("/")[2]);
    let channelId = parseInt(ownProps.location.pathname.split("/")[3]);
    let convoId = parseInt(ownProps.location.pathname.split("/")[3]);
    let channel = state.entities.channels[channelId];
    let server = state.entities.servers[serverId];
    let convo = state.entities.conversations[convoId];
    return {
        servers: Object.values(state.entities.servers),
        currentUserId: state.session.id,
        invitedServer: state.session.invitedServer,
        channelId,
        serverId,
        convoId
    }

};

const mDTP = dispatch => ({
});

export default withRouter(connect(mSTP, mDTP)(AccordApp));