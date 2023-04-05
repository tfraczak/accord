import React from 'react';
import UserShowButton from '../../user/user_show/user_show_button';

export default (props) => {
  const {
    member,
    currentUserId,
    server,
    menuId,
    isOwner,
    kickMember,
    handleContext,
    closeMemberMenu,
    openModal,
    history,
    createConversation,
    removeCreatedConvo,
  } = props;

  const isCurrentUser = currentUserId === member.id;

  let username;
  if (member.localUsername) {
    username = member.localUsername;
  } else {
    username = member.username;
  }

  const modal = {
    type: 'user show',
    user: member,
  };

  const handleModal = () => {
    const memberMenu = document.getElementById(`member-menu-${member.username}#${member.usernameId}`);
    const mem = document.getElementById(`ml-item-${member.id}`);
    memberMenu.classList.add('hidden');
    mem.classList.remove('active');
    openModal(modal);
  };

  const handleMessage = (e) => {
    e.preventDefault();
    const conversation = {
      initiatorId: currentUserId,
      receiverId: member.id,
      name: '',
    };
    createConversation(conversation)
      .then(
        (res) => {
          const mem = document.getElementById(`ml-item-${member.id}`);
          const memberMenu = document.getElementById(`member-menu-${member.username}#${member.usernameId}`);
          mem.classList.remove('active');
          memberMenu.classList.add('hidden');
          document.removeEventListener('mousedown', closeMemberMenu(memberMenu, mem));
          history.push(`/channels/@me/${res.payload.conversation.id}`);
          removeCreatedConvo();
        },
      );
  };

  return (
    <li id={ `ml-item-${member.id}` } onContextMenu={ handleContext } className="ml-item">
      <div className="user-wrapper">
        <img
          src={ member.avatarUrl ?  member.avatarUrl : globalThis.defaultAvatarUrl }
          alt={`${ username }-avatar-${ member.id }`}
          className="m-avatar"
        />
        <span className="ml-username">{ username }</span>
        { member.id === server.ownerId ? ( <i className="fas fa-star"></i> ) : null }
      </div>

      <div id={ menuId } className="member-menu hidden">

        <ul>

          <UserShowButton openModal={ handleModal } user={ member } />

          {
            isCurrentUser ? null :
              (
                <li className="message-btn">
                  <button type="button" onClick={ handleMessage }>
                                        Message
                  </button>
                </li>
              )
          }

          { isOwner && member.id !== server.ownerId ?
            (
              <>
                <div className="separator"></div>
                <li>
                  <button type="button" className="danger" onClick={ kickMember }>
                    {`Kick ${member.username}`}
                  </button>
                </li>
              </>
            ) : null
          }

        </ul>
      </div>

    </li>
  );
};