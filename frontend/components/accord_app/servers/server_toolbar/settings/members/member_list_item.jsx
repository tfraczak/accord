import React from 'react';

export default (props) => {
    const {
        member,
        server,
        kickMember,
        transferOwnership,
        isOwner
    } = props;
    let username;
    if (member.localUsername) {
        username = member.localUsername;
    } else {
        username = member.username;
    }

    return (
        <> 
            <li className="m-item">
                <div className="member-wrapper">
                    <img
                        src={ member.avatarUrl ?  member.avatarUrl : window.defaultAvatarUrl }
                        alt={`${ username }-avatar-${ member.id }`}
                        className="m-avatar" />
                    <div className="usernames-wrapper">
                        <span className="m-local-username">{ username }</span>
                        <h6 className="m-global-username wrapper">
                            { `@${member.username}#${member.usernameId}` }
                        </h6>
                    </div>
                    { member.id === server.ownerId ? <i className="fas fa-crown"></i> : null }
                </div>
                <i className="fas fa-ellipsis-v">
                    <ul>
                        <li>
                            <button onClick={ kickMember }>
                                Kick
                            </button>
                        </li>
                        { isOwner ? 
                            (
                                <li>
                                    <button onClick={ transferOwnership }>
                                        Transfer Ownership
                                    </button>
                                </li>
                            ) : null
                        }
                        
                    </ul>
                </i>
            </li>
            <div className="separator" />
        </>
        
    );
}