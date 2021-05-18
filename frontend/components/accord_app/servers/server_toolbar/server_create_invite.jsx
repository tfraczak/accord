import React from 'react';

class CreateServerInvite extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            invite: this.props.invite ? this.props.invite : "",
            serverId: parseInt(this.props.params.serverId),
        };
        this.handleInvite = this.handleInvite.bind(this);
        this.insertUrlToken = this.insertUrlToken.bind(this);
    }

    componentDidMount() {
        this.props.removeInvitation();
    }

    handleInvite() {
        if (!this.state.invite) {
            this.props.createInvite(this.props.serverId).then(() => {
                this.setState({ receivedInvite: true });
            });
        } else {
            this.props.removeInvitation();
            this.forceUpdate();
            this.setState({ receivedInvite: false });
        }
    }

    insertUrlToken() {
        if (this.props.invite && (this.state.serverId === parseInt(this.props.params.serverId))) {
            return this.props.invite.urlToken;
        } else {
            return "";
        }
    }

    insertButtonText() {
        if (this.props.invite && (this.state.serverId === parseInt(this.props.params.serverId))) {
            return "REMOVE INVITE";
        } else {
            return "CREATE INVITE";
        }
    }

    render() {
        
        return (
            <li>
                <input
                    type="text"
                    disabled 
                    value={`accord.com/${this.insertUrlToken()}`}/>
                <button onClick={this.handleInvite}>{ this.insertButtonText() }</button>
            </li>
        )
    } 

}

export default CreateServerInvite;

    