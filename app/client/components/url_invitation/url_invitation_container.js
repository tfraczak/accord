import UrlInvitation from './url_invitation';
import { connect } from 'react-redux';
import { getServerByUrl, joinServer, retrieveUserServers } from '../../actions/server_actions';
import { validUrlToken, serverInitials } from '@helpers';

const mSTP = (state, ownProps) => {
  const urlToken = ownProps.match.params.urlToken;
  Object.freeze(state.entities.servers);

  return {
    currentUserId: state.session.id,
    invitedServer: state.session.invitedServer,
    urlToken,
    serverIds: Object.keys(Object.assign({}, state.entities.servers)),
    errors: state.errors.servers,
  };
};

const mDTP = (dispatch) => {
  return {
    getServerByUrl: (urlToken) => dispatch(getServerByUrl(urlToken)),
    joinServer: (membership) => dispatch(joinServer(membership)),
    retrieveUserServers: (userId) => dispatch(retrieveUserServers(userId)),
    validUrlToken: validUrlToken,
    serverInitials: serverInitials,
  };
};

export default connect(mSTP, mDTP)(UrlInvitation);