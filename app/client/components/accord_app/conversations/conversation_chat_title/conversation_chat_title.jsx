import React from 'react';
import { limitChars } from '@helpers';

export default (props) => {
  const {
    conversation,
    users,
    convoMembers,
    currentUserId,
    openModal,
  } = props;

  if (!conversation) return null;

  const {
    initiatorId,
    receiverId,
    name,
  } = conversation;

  const user = receiverId === currentUserId ? users[initiatorId] : users[receiverId];

  const modal = {
    type: 'user show',
    user,
  };

  const otherMembers = convoMembers.filter((member) => member.id !== currentUserId);

  const convoTitle = name ? name : limitChars(otherMembers.join(', '), 42);

  return (
    <div className="conversation-chat-title-wrapper">
      {
        convoMembers.length < 3 ? (
          <>
            <span className="title-icon"><i className="fas fa-at"></i></span>
            <h1 onClick={ () => openModal(modal) } className="username">{ user.username }</h1>
          </>
        ) : (
          <>
            <span className="title-icon"><i className="fas fa-users"></i></span>
            <h1 className="convo-name">{ convoTitle }</h1>
          </>
        )
      }
    </div>
  );
};