import { withRouter } from '@utils';
import { connect } from 'react-redux';
import MessageForm from './message_form';

const mSTP = (state, ownProps) => {
  return {};
};

const mDTP = (dispatch) => {
  return {};
};

export default withRouter(connect(mSTP, mDTP)(MessageForm));