import React from 'react';

export default (props) => {
    const { member, server } = props;
    let username;
    if (member.localUsername) {
        username = member.localUsername;
    } else {
        username = member.username;
    }
    return (
        <li className="ml-item">
            <img
                src={ member.avatarUrl ?  member.avatarUrl : window.defaultAvatarUrl }
                alt={`${ username }-avatar-${ member.id }`}
                className="m-avatar"
            />
            <span className="ml-username">{ username }</span>
            { member.id === server.ownerId ? ( <i className="fas fa-star"></i> ) : null }
        </li>
    );
}