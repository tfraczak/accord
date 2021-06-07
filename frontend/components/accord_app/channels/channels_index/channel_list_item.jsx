import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ChannelSettingsButton from "../channel_modals/channel_settings/channel_settings_button";

class ChannelListItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {
            channel,
            serverId,
            openFullModal
        } = this.props;
        return (
            <li>
                <NavLink to={`/channels/${serverId}/${channel.id}`}>
                    <div className="channel-name-wrapper">
                        <span className="cl type">{ channel.mediaType === "Text" ? (<i className="fas fa-hashtag"></i>) : (<i className="fas fa-volume-up"></i>) }</span>
                        <span className="channel-name">{ channel.name }</span>
                    </div>
                    <div className="channel-options-wrapper">
                        <ChannelSettingsButton openFullModal={openFullModal} />
                    </div>
                </NavLink>
            </li>
        )
    }
}
export default ChannelListItem;