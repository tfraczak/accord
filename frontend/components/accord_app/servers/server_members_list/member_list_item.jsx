import React, { Component } from 'react';

export default (props) => {
    const { member } = props;
    let username;
    if (member.localUsername) {
        username = member.localUsername;
    } else {
        username = member.username;
    }

    return (
        <li key={ `members-list-${member.id}` } className="ml-item">
            <img
                src={window.defaultAvatarUrl}
                alt={`${username}-avatar-${member.id}`}
                className="ml-avatar" />
            <span className="ml-username">{ username }</span>
        </li>
    );
}