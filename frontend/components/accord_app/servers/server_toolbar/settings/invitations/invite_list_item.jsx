import React from 'react';
import { printTime } from '../../../../../../utils/func_utils';
import InviteExpiration from './invite_expiration';

class InviteListItem extends React.Component {
    constructor(props) {
        super(props);
    
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseOver() {
        const deleteInvite = document.getElementById(`delete-invite-${this.props.invite.id}`);
        deleteInvite.classList.remove("hidden");
    }

    mouseLeave() {
        const deleteInvite = document.getElementById(`delete-invite-${this.props.invite.id}`);
        deleteInvite.classList.add("hidden");
    }


    render() {
        const {
            invite,
            inviter,
            deleteInvite
        } = this.props;
        return (
            <> 
                <div 
                    id={`i-item-${invite.id}`} className="i-item"
                    onMouseOver={ this.mouseOver }
                    onMouseLeave={ this.mouseLeave }
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
                                    ( <InviteExpiration key={ `invite-exp-${invite.id}` } invite={ invite } /> ) :
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

}

export default InviteListItem;