import React, { Component } from 'react';
import ChannelListItem from './channel_list_item';

class ChannelsIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            channels,
            server,
        } = this.props;
        if (server) {
            return (
                <div className="channels-index-wrapper">
                    <div className="channels-title-wrapper">
                        <i className="fas fa-chevron-down channels-list"></i>
                        <h3>TEXT CHANNELS</h3>
                        <i className="fas fa-plus add-channel"></i>
                    </div>
                    <ul id="channels-index">
                        {channels.map(channel => <ChannelListItem key={`channel-${channel.id}`} channel={channel} serverId={server.id}/>)}
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    }

}

export default ChannelsIndex;