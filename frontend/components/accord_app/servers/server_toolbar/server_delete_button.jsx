import React from 'react';

export default props => {

    return (
        <li>
            <button className="st-delete-btn" onClick={props.deleteServer}>Delete Server</button>
        </li>
    )
}