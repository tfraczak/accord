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
        openModal,
        history,
        createConversation,
        createdConvo,
        removeCreatedConvo,
    } = props;

    let username;
    if (member.localUsername) {
        username = member.localUsername;
    } else {
        username = member.username;
    }

    const modal = {
        type: "user show",
        user: member,
    };

    const handleModal = () => {
        const memberMenu = document.getElementById(`member-menu-${member.username}#${member.usernameId}`);
        const mem = document.getElementById(`ml-item-${member.id}`);
        memberMenu.classList.add("hidden");
        mem.classList.remove("active");
        openModal(modal);
    }

    const handleMessage = (e) => {
        e.preventDefault();
        const conversation = {
            initiatorId: currentUserId,
            receiverId: member.id,
            name: "",
        };
        createConversation(conversation)
            .then(
                () => {
                    if (createdConvo) {
                        history.push(`/channels/@me/${createdConvo.id}`);
                        removeCreatedConvo();
                    }
                }
            );
    };

    return (
        <li id={ `ml-item-${member.id}` } onContextMenu={ handleContext } className="ml-item">
            <div className="user-wrapper">
                <img
                    src={ member.avatarUrl ?  member.avatarUrl : window.defaultAvatarUrl }
                    alt={`${ username }-avatar-${ member.id }`}
                    className="m-avatar"
                />
                <span className="ml-username">{ username }</span>
                { member.id === server.ownerId ? ( <i className="fas fa-star"></i> ) : null }
            </div>
            
            <div id={ menuId } className="member-menu hidden">
                    {/* <i className="fas fa-ellipsis-v"></i> */}
                    <ul>
                        {/* <li className="profile-btn">
                            <button type="button" onClick={ () => openModal(modal) }>
                                Profile
                            </button>
                        </li> */}
                        
                        <UserShowButton openModal={ handleModal } user={ member } />

                        <li className="message-btn">
                            <button type="button" onClick={ handleMessage }>
                                Message
                            </button>
                        </li>
                        
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
}