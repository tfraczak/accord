import React from 'react';

export default props => {

    return (
        <li>
            <button onClick={props.leaveServer}>Delete Server</button>
        </li>
    )
}