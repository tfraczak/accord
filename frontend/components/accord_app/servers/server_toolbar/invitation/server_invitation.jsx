import React from 'react';
import Select from 'react-select';

class ServerInvitation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expiration: ""
        };

        this.handleInvite = this.handleInvite.bind(this);
        this.clickClose = this.clickClose.bind(this);
        this.copyClick = this.copyClick.bind(this);
        this.canCopy = this.canCopy.bind(this);
        this.check = this.check.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        
        if (!this.props.invitation && (this.state.expiration !== "")) {
            const invitation = {};
            invitation['serverId'] = this.props.server.id;
            invitation['inviterId'] = this.props.currentUser.id;
            invitation['expiration'] = this.state.expiration.value;
            this.props.createInvite(invitation);
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

    check() {
        return (
            !!this.props.invitation ||
            this.state.expiration === ""
        )
    }

    handleChange(option) {
        debugger
        this.setState({ expiration: option });
    }

    render() {
        const { 
            server,
            invitation,
        } = this.props;

        const options = [
            { isSelected: true, isDisabled: true, label: 'Select' },
            { value: 0.5, label: '30 minutes' },
            { value: 1, label: '1 hour' },
            { value: 6, label: '6 hours' },
            { value: 12, label: '12 hours' },
            { value: 24, label: '1 day' },
            { value: 27*7, label: '7 days' },
            { value: null, label: 'Never' },
        ];

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
                    <div className="expiration-options-wrapper">
                        <h6 className="select-label">EXPIRE AFTER</h6>
                        <Select 
                            options={ options }
                            onChange={ this.handleChange }
                            value={ this.state.expiration }
                        />
                    </div>
                </div>
                <div className="create-invite-btns-wrapper">
                    <button onClick={ this.clickClose } className="create-invite-back">Back</button>
                    <button onClick={ this.handleInvite } disabled={ this.check() } className="create-invite-btn">Create Invite Token</button>
                </div>
            </div>
        )
    }
}

export default ServerInvitation;