import React from 'react';

export default (props) => {
    const insertLogoutButton = () => (
        <button onClick={props.logout}>Logout</button>
    )

    return (
        <header className="header-wrapper">
            <img className="horizontal-logo" src="/assets/splash_logo.png" />
            {props.currentUser ? insertLogoutButton() : null}
        </header>
    )
}