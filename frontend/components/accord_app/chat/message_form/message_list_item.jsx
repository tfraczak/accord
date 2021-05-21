import React from 'react';
import { extractDateTime } from "../../../../utils/func_utils";

export default props => {
    const { message, chatMembers } = props;
    return (
        <div key={`message-${message.id}`} className="message-wrapper">
            <div className="message-info-wrapper">
                <img src={window.defaultAvatarUrl} className="chat-avatar" />
                <h6 className="author">{ chatMembers[message.authorId] ? chatMembers[message.authorId].username : "MemberLeft"}</h6>
                <p className="date-time">{extractDateTime(message.createdAt)}</p>
            </div>
            <p className="message" >{ message.body }</p>
        </div>
    );
};
