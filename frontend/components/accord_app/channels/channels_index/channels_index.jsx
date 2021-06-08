import React, { Component } from 'react';
import ChannelListItem from './channel_list_item';
import CreateChannelButton from '../channel_modals/create_channel_form/create_channel_button';

class ChannelsIndex extends Component {
    constructor(props) {
        super(props);
    }

    showTextChannels(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.toggle("hidden");
        document.getElementById("channels-index").classList.toggle("hidden");
    }

    modalClick() {

    }

    render() {
        const {
            channels,
            server,
            openModal,
            currentUserId,
            openFullModal,
        } = this.props;
        if (server) {
            return (
                <div className="channels-index-wrapper">
                    <div className="channels-title-wrapper">
                        <i onClick={this.showTextChannels} id="toggle-channels-index" className="fas fa-chevron-down channels-list"></i>
                        <h3>TEXT CHANNELS</h3>
                        <CreateChannelButton
                            isOwner={currentUserId === server.ownerId}
                            openModal={openModal}
                            key={`server-channels-${server.id}`} />
                    </div>
                    <ul id="channels-index">
                        {channels.map(channel => (
                            <ChannelListItem 
                                key={`channel-${channel.id}`}
                                openFullModal={() => openFullModal({ type: "channel settings", channel })} 
                                channel={channel} 
                                server={server}
                                currentUserId={currentUserId}/>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    }

}

export default ChannelsIndex;