import React from 'react';
import { currentUsersMembershipId } from '../../../../../../utils/selectors';

export default (props) => {
    const {
        member,
        server,
        kickMember,
        transferOwnership,
        isOwner,
        handleContext
    } = props;
    let username;
    if (member.localUsername) {
        username = member.localUsername;
    } else {
        username = member.username;
    }

    return (
        <> 
            <li id={`m-item-${member.id}`} className="m-item" onContextMenu={ handleContext }>
                <div className="member-wrapper">
                    <img
                        src={ member.avatarUrl ?  member.avatarUrl : window.defaultAvatarUrl }
                        alt={`${ username }-avatar-${ member.id }`}
                        className="m-avatar" />
                    <div className="usernames-wrapper">
                        <div className="usernames">
                            <span className="m-local-username">{ username }</span>
                            <h6 className="m-global-username">
                                { `@${member.username}#${member.usernameId}` }
                            </h6>
                        </div>
                        { member.id === server.ownerId ? <i className="fas fa-star"></i> : null }
                    </div>
                </div>
                <div id={ `member-options-${member.username}#${member.usernameId}` } className="member-options hidden">
                    {/* <i className="fas fa-ellipsis-v"></i> */}
                    { isOwner && member.id !== server.ownerId ? (
                    <ul>
                        { isOwner && member.id !== server.ownerId ?
                            (
                                <li>
                                    <button onClick={ kickMember }>
                                        {`Kick ${member.username}`}
                                    </button>
                                </li>
                            ) : null
                        }
                        
                        { isOwner && member.id !== server.ownerId ? 
                            (
                                <>
                                    <div className="separator"></div>
                                    <li>
                                        <button onClick={ transferOwnership }>
                                            Transfer Ownership
                                        </button>
                                    </li>
                                </>
                            ) : null
                        }
                    </ul>
                    ) : null }
                </div>
                
            </li>
            <div className="separator" />
        </>
        
    );
}