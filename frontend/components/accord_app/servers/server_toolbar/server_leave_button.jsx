import React from 'react';

export default props => {
    const { leaveServer, membershipId } = props;
    
    debugger
    return (
        <li>
            <button onClick={() => leaveServer(membershipId)}>Leave Server</button>
        </li>
    )
}