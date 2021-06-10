import React, { Component } from 'react';

export default props => {
    const { channel } = props;
    return (
        <div className="channel-chat-title-wrapper">
            <div className="cct-type" ><span className="type"><i className="fas fa-hashtag"></i></span></div>
            <span className="cct-name">{ channel.name }</span>
        </div>
    )
}