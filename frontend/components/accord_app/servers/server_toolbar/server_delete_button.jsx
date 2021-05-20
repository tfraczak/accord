import React from 'react';

export default props => {

    return (
        <li onClick={e => e.stopPropagation()}>
            <button className="st-delete-btn" onClick={props.deleteServer}>Delete Server</button>
        </li>
    )
}