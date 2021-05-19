import React from 'react';

export default props => {

    props.retrieveUserLoadData(props.currentUserId, props.history);
    
    return (
        <div className="loading-wrapper">
            <img src={window.loadingImg} alt="loading" />
            <h1>{props.loadingMsg}</h1>
        </div>
    )
};