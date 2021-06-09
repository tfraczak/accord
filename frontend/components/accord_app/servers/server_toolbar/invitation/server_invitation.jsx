import React from 'react';

class ServerInvitation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invite: props.invitation ? props.invitation : "",
            serverId: parseInt(props.location.pathname.split("/")[2]),
        };

        this.handleInvite = this.handleInvite.bind(this);
        this.clickClose = this.clickClose.bind(this);
        this.copyClick = this.copyClick.bind(this);
        this.canCopy = this.canCopy.bind(this);
    }

    componentWillUnmount() {
        this.props.removeInvitation();
    }
    
    clickClose(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.closeModal();
    }

    handleInvite(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.props.invitation) {
            this.props.createInvite(this.props.server.id);
        }
    }

    canCopy() {
        if (this.props.invitation) return true;
        return false;
    }

    copyClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.canCopy()) {
            const urlToken = document.getElementById("url-token");
            navigator.clipboard.writeText(urlToken.textContent);
            urlToken.classList.add("copied");
            e.currentTarget.classList.add("copied");
            e.currentTarget.textContent = "Copied!";
        }
    }

    render() {
        const { 
            server,
            invitation,
        } = this.props;

        return (
            <div className="create-invite-wrapper">
                {/* <i className="fas fa-times" onClick={this.clickClose}></i> */}
                <h6 className="close" onClick={this.clickClose}>+</h6>
                <h1 className="create-invite-title">{ `INVITE FRIENDS TO ${server.name.toUpperCase()}` }</h1>
                <div className="invite-link-wrapper">
                    <h2>SEND A SERVER INVITE TOKEN TO A FRIEND</h2>
                    <div className="urlToken-wrapper">
                        <div>
                            <h6 className="uri">https://accord.com/</h6>
                            { invitation ?
                            ( <h6 id="url-token" className="url-token actual">{invitation.urlToken}</h6> ) : 
                            ( <h6 id="url-token" className="url-token example">dX0cmrzF0w</h6> )
                            }
                        </div>
                        <button onClick={ this.copyClick } disabled={ !this.canCopy() }>Copy</button>
                    </div>
                </div>
                <div className="create-invite-btns-wrapper">
                    <button onClick={ this.clickClose } className="create-invite-back">Back</button>
                    <button onClick={ this.handleInvite } disabled={!!invitation} className="create-invite-btn">Create Invite Token</button>
                </div>
            </div>
        )
    }
}

export default ServerInvitation;