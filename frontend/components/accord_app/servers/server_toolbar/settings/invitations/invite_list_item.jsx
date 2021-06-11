import React from 'react';

export default (props) => {
    const {
        invite,
        inviter,
        deleteInvite
    } = props;

    const mouseOver = () => {
        const deleteInvite = document.getElementById(`delete-invite-${invite.id}`);
        deleteInvite.classList.remove("hidden");
    }

    const mouseLeave = () => {
        const deleteInvite = document.getElementById(`delete-invite-${invite.id}`);
        deleteInvite.classList.add("hidden");
    }
    

    return (
        <> 
            <div 
                id={`i-item-${invite.id}`} className="i-item"
                onMouseOver={ mouseOver }
                onMouseLeave={ mouseLeave }
            >
                
                {/* inviter */}
                <div className="inviter wrapper">
                    <img
                        src={ inviter.avatarUrl ?  inviter.avatarUrl : window.defaultAvatarUrl }
                        alt={`${ inviter.username }-avatar-${ inviter.username_id }`}
                        className="i-avatar"
                    />
                    <div className="username-wrapper">
                        <span className="username">{ `${inviter.username}` }</span>
                        <h6 className="username-id">{ `#${inviter.usernameId}` }</h6>
                    </div>
                </div>

                {/* invite code */}
                <div className="invite-code wrapper">
                    <span className="url-token">{ `${invite.urlToken}` }</span>
                </div>
                
                {/* expires */}
                <div className="expires wrapper">
                        { invite.isExpired ?
                            ( <span className="expired">EXPIRED</span> ) :
                            invite.expiration ?
                                ( <span className="expiration-time">{ `${invite.expiration}` }</span> ) :
                                ( <span className="no-expiration">∞</span> )
                        }
                </div>

                <div id={ `delete-invite-${invite.id}` } className="delete-wrapper hidden">
                    <button className="delete-invite-button hidden" onClick={ deleteInvite }>
                        +
                    </button>
                </div>
                
            </div>
            <div className="separator" />
        </>
        
    );
}