import React, { Component } from 'react';
import ChannelListItemContainer from './channel_list_item_container';
import CreateChannelButton from '../channel_modals/create_channel_form/create_channel_button';

class ChannelsIndex extends Component {
    constructor(props) {
        super(props);
    }

    showTextChannels(e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("toggle-channels-index").classList.toggle("hidden");
        document.getElementById("channels-index").classList.toggle("hidden");
    }

    render() {
        const {
            channels,
            server,
            openModal,
            currentUserId,
            openFullModal,
            createChatSub,
            receiveChatSub,
        } = this.props;
        if (server) {
            return (
                <div className="channels-index-wrapper">
                    <div className="channels-title-wrapper">
                        <div onClick={ this.showTextChannels } className="toggle-channels-wrapper">
                            <i id="toggle-channels-index" className="fas fa-chevron-down channels-list"></i>
                            <h3>TEXT CHANNELS</h3>
                        </div>
                        <CreateChannelButton
                            isOwner={ currentUserId === server.ownerId }
                            openModal={ openModal }
                            key={ `server-channels-${server.id}` } />
                    </div>
                    <ul id="channels-index">
                        {channels.map(channel => (
                            <ChannelListItemContainer
                                key={ `channel-${channel.id}` }
                                openFullModal={() => openFullModal({ type: "channel settings", channel })} 
                                channel={ channel } 
                                server={ server }
                                currentUserId={ currentUserId }
                                createChatSub={ createChatSub }
                                receiveChatSub={ receiveChatSub }
                            />
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