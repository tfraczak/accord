import React from 'react';

class CreateServerInvite extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            invite: "", 
        };
    }

    handleInvite

    render() {

        return (
            <li>
                <input
                type="text"
                disabled 
                value={this.state.invite}/>
                <button onClick={this.handleInvite}>Create Invite</button>
            </li>
        )
    } 

}

    