import React from 'react';

export default props => {
    if (!Object.keys(props.sessionSub).length) {
        const sub = props.createSessionSub(props.currentUserId)
        props.receiveSessionSub(sub);
    }
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