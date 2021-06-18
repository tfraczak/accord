import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { limitChars } from '../../../../utils/func_utils';

class ConversationListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            conversation,
            currentUserId,
            users,
            convoMembers,
        } = this.props;

        const otherMembers = convoMembers.filter(member => member.id !== currentUserId);

        const convoMemberNames = otherMembers.map(member => member.username);

        const user = users[conversation.receiverId];

        return (
            <li>
                <NavLink to={`/channels/@me/${conversation.id}`}>
                    {
                        convoMembers.length > 2 ? (
                            <>
                                <img 
                                    className="convo-avatar" 
                                    src={ conversation.imageUrl ? conversation.imageUrl : window.defaultAvatarUrl } 
                                    alt={`${conversation.name}-avatar`} 
                                />
                                <div className="group-chat-wrapper">
                                    <h3 className="convo-member-names">{ limitChars(convoMemberNames.join(", "),21) }</h3>
                                    <h6 className="num-members">{ `${convoMembers.length} Members` }</h6>
                                </div>
                            </>
                        ) : (
                            <>
                                <img 
                                    className="convo-avatar" 
                                    src={ user.avatarUrl ? user.avatarUrl : window.defaultAvatarUrl } 
                                    alt={`${user.username}-avatar`} 
                                />
                                <span className="user">{ user.username }</span>
                            </>
                        )
                    }
                </NavLink>
            </li>
        )
    }
}
export default ConversationListItem;