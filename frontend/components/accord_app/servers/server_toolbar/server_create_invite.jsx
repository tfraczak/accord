import React from 'react';

class CreateServerInvite extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            invite: this.props.invite ? this.props.invite : "",
            serverId: parseInt(this.props.params.serverId),
        };
        this.handleInvite = this.handleInvite.bind(this);
    }

    componentWillUnmount() {
        this.props.removeInvitation();
    }

    handleInvite() {
        if (!this.props.invite) {
            this.props.createInvite(this.props.serverId);
        }
    }

    insertClickMe() {
        if (this.props.invite && (this.state.serverId === parseInt(this.props.params.serverId))) {
            return <p className="urltoken-copy">CLICK TO COPY</p>
        } else {
            return null;
        }
    }

    copyClick(e) {
        navigator.clipboard.writeText(e.currentTarget.textContent);
    }

    render() {
        
        return (
            <li>
                { this.insertClickMe() }
                <div className="invite" onClick={ this.copyClick }>
                    { this.props.invite ? this.props.invite.urlToken : "" }
                </div>
                <button className="create-button" onClick={ this.handleInvite }>CREATE INVITE</button>
            </li>
        )
    } 

}

export default CreateServerInvite;

    