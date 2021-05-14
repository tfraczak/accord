import React from 'react';

export default props => {
    
    props.retrieveUserLoadData(props.currentUserId,props.history)
    const loadingMsgs = [
        "Hacking into the mainframe...",
        "Aright boss, gettin' your stuff...",
        "Fetching all your data...",
        "Splendid show, my dear! Let me retrieve your data!",
    ];

    

    const loadingMsg = () => {
        const i = Math.floor(Math.random() * loadingMsgs.length);
        return loadingMsgs[i];
    }
    
    return (
        <div className="loading-wrapper">
            <img src={window.loadingImg} alt="loading" />
            <h1>{loadingMsg()}</h1>
        </div>
    )
};