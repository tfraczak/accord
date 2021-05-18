import React from 'react';
import { NavLink } from 'react-router-dom';

export default props => {
    const {
        channel,
        serverId,
    } = props;
    return (
        <li key={`${channel.id}-channel`}>
            <NavLink to={`/channels/${serverId}/${channel.id}`}>
                <span className="type">{ channel.mediaType === "text" ? (<i className="fas fa-hashtag"></i>) : (<i className="fas fa-volume-up"></i>) }</span>
                <span className="channel-name">{ channel.name }</span>
            </NavLink>
        </li>
    )
}