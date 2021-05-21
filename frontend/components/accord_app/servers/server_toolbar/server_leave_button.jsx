import React, { Component } from 'react';

class ServerLeaveButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        debugger
        this.props.history.push("/channels/@me");
        this.props.leaveServer(this.props.membershipId);
    }


    render() {
        return (
            <li onClick={e => e.stopPropagation()}>
                <button className="st-leave-server-btn" onClick={this.handleClick}>Leave Server</button>
            </li>
        )
    }

}

export default ServerLeaveButton;