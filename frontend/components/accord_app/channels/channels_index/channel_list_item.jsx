import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ChannelListItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {
            channel,
            serverId,
        } = this.props;
        return (
            <li>
                <NavLink to={`/channels/${serverId}/${channel.id}`}>
                    <span className="cl type">{ channel.mediaType === "Text" ? (<i className="fas fa-hashtag"></i>) : (<i className="fas fa-volume-up"></i>) }</span>
                    <span className="channel-name">{ channel.name }</span>
                </NavLink>
            </li>
        )
    }
}
export default ChannelListItem;