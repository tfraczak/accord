import React from 'react';


export default props => {

    const msgs = [
        'Your personal info coming soon...',
        'Please excuse our appearance!',
        'Nothing here... Yet!',
        "We're workin' here!",
    ];

    const msg = msgs[Math.floor(Math.random()*4)];

    return (
        <div className="main-focus placeholder">
            <div className="messages-wrapper placeholder">
                <img className="construction-img" src={ window.construction } alt="under construction" />
                <h1 className="construction-msg">{ msg }</h1>
            </div>
        </div>
        
    )
};