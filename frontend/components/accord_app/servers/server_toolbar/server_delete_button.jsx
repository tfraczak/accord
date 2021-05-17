import React from 'react';

export default props => {

    return (
        <li>
            <button onClick={props.deleteServer}>Delete Server</button>
        </li>
    )
}