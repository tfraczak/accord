import React from 'react';

export default props => {
    props.retrieveUserLoadData(props.currentUserId)
        .then(
            () => {
                if (props.history.location.pathname !== "/channels/@me") {
                    props.history.push("/channels/@me");
                }
            },
            () => props.history.push("/")
        );
    
    return (
        <div className="loading-wrapper">
            <img src={ window.loadingImg } alt="loading" />
            <h1>{ props.loadingMsg }</h1>
        </div>
    )
};