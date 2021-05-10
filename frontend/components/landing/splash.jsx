import React from 'react';

export default (props) => {
    const insertLogoutButton = () => (
        <button onClick={props.logout}>Logout</button>
    )

    return (
        <header className="header-wrapper">
            <h1>Accord</h1>
            <img src="/assets/splash_logo.png" width="50" height="50" />
            {props.currentUser ? insertLogoutButton() : null}
        </header>
    )
}