import React from 'react';
import { Link } from 'react-router-dom';


export default props => {
    const { currentUser, logout } = props;
    return (
        <>
            <img src={ currentUser.avatarUrl ? currentUser.avatarUrl : window.defaultAvatarUrl } className="currentuser-avatar" />
            <div className="username-wrapper" onClick={() => navigator.clipboard.writeText(`${currentUser.username}#${currentUser.usernameId}`)}>
                <h1 className="username">{ currentUser.username }</h1>
                <p className="username-id">#{ currentUser.usernameId }</p>
            </div>
            <div className="temp-links">
                <Link className="to-home" to="/"><i className="fas fa-home"></i></Link>
                <button className="logout" onClick={() => logout()}><i className="fas fa-sign-out-alt"></i></button>
            </div>
        </>
    )
};