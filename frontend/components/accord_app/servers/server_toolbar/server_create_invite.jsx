import React from 'react';

class CreateServerInvite extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            invite: this.props.invite ? this.props.invite : "", 
        };
    }

    handleInvite() {
        if (this.state === "") {
            const { createInvite } = this.props;
            createInvite(this.props.match.params.serverId);
        }
    }

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

export default CreateServerInvite;

    