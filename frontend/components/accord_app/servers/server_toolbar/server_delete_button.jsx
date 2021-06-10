import React from 'react';

export default props => {

    const onClick = () => {
        props.history.push("/channels/@me");
        props.deleteServer();
    }

    return (
        <li onClick={e => e.stopPropagation()}>
            <button className="st-delete-btn" onClick={onClick}>Delete Server</button>
        </li>
    )
}