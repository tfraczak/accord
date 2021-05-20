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

    render() {
        
        return (
            <li onClick={e => e.stopPropagation()}>
                <input
                    type="text"
                    disabled
                    value={`accord.com/${this.insertUrlToken()}`}
                    onClick={e => e.stopPropagation()}/>
                <button onClick={this.handleInvite}>CREATE INVITE</button>
            </li>
        )
    } 

}

export default CreateServerInvite;

    