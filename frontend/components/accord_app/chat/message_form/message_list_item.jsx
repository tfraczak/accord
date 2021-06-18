import React from 'react';
import { extractDateTime } from "../../../../utils/func_utils";

export default props => {
    const { message, chatMembers, type } = props;

    switch(type) {
        case "Channel":
            return (
                <div key={`message-${message.id}`} className="message-wrapper">
                    <div className="message-info-wrapper">
                        <img src={ message.author.avatarUrl ? message.author.avatarUrl : window.defaultAvatarUrl} className="chat-avatar" />
                        <h6 className={ `author${chatMembers[message.authorId] ? "" : " not-a-member"}` }>
                            { 
                                chatMembers[message.authorId] ? 
                                    (
                                        chatMembers[message.authorId].localUsername ? 
                                            chatMembers[message.authorId].localUsername :
                                            chatMembers[message.authorId].username
                                    ) :
                                    (
                                        message.author ?
                                            message.author.localUsername :
                                            "(Deleted User)"
                                    )
                            }
                        </h6>
                        <p className="date-time">{extractDateTime(message.createdAt)}</p>
                    </div>
                    <p className="message" >{ message.body }</p>
                </div>
            );
        case "Conversation":
            return (
                <div key={`message-${message.id}`} className="message-wrapper">
                    <div className="message-info-wrapper">
                        <img src={ message.author.avatarUrl ? message.author.avatarUrl : window.defaultAvatarUrl} className="chat-avatar" />
                        <h6 className={ `author${chatMembers[message.authorId] ? "" : " not-a-member"}` }>
                            { 
                                chatMembers[message.authorId] ? 
                                    (
                                        chatMembers[message.authorId].username
                                    ) :
                                    (
                                        message.author ?
                                            message.author.username :
                                            "(Deleted User)"
                                    )
                            }
                        </h6>
                        <p className="date-time">{extractDateTime(message.createdAt)}</p>
                    </div>
                    <p className="message" >{ message.body }</p>
                </div>
            );
        default:
            return null;
    }

    
};
