import React, { Component } from 'react';

class ServerLeaveButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.leaveServer(this.props.membershipId)
            .then(() => this.props.history.push("/channels/@me"));
    }


    render() {

        return (
            <li>
                <button className="st-leave-server-btn" onClick={this.handleClick}>Leave Server</button>
            </li>
        )
    }

}

export default ServerLeaveButton;