import React from 'react';

export default (props) => {
    const insertLogoutButton = () => (
        <button onClick={props.logout}>Logout</button>
    )

    return (
        <header className="header-wrapper">
            <img id="splash-logo" className="horizontal-logo" src={window.logoUrl} />
            {props.currentUser ? insertLogoutButton() : null}
        </header>
    )
}