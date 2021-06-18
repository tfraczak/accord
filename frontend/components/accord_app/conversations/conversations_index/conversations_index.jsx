import React, { Component } from 'react';
import ConversationListItemContainer from './conversation_list_item_container';

class ConversationsIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            conversations,
            currentUserId,
        } = this.props;
        return (
            <div className="conversations-index-wrapper">
                <div className="conversations-title-wrapper">
                    <h3 className="title">DIRECT MESSAGES</h3>
                </div>
                <ul id="conversations-index">
                    {conversations.map(conversation => (
                        <ConversationListItemContainer
                            key={ `conversation-${conversation.id}` }
                            conversation={ conversation } 
                            currentUserId={ currentUserId }
                        />
                    ))}
                </ul>
            </div>
        )
    }

}

export default ConversationsIndex;