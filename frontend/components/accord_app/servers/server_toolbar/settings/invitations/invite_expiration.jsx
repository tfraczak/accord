import React from 'react';
import { printTime } from '../../../../../../utils/func_utils';

class InviteExpiration extends React.Component {
  constructor(props) {
    super(props);
    this.setTime = this.setTime.bind(this);
    if (!props.invite.isExpired && props.invite.expiration) {
      this.state = { timeLeft: printTime(props.invite.createdAt, props.invite.expiration) }
      setInterval(this.setTime, 1000);
    }
  }

  setTime() {
    const { invite } = this.props;
    this.setState({timeLeft: printTime(invite.createdAt, invite.expiration)});
  }

  render() {
    return (
      <span className="expiration-time">{ `${this.state.timeLeft}` }</span>
    )
  }
}

export default InviteExpiration;