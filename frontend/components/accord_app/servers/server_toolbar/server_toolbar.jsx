import React, { Component } from 'react';
import ServerUpdateForm from './server_update_form';
import ServerDeleteButton from './server_delete_button';
import ServerLeaveButton from './server_leave_button';
import CreateServerInvite from './server_create_invite';


class ServerToolbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: null,
            
        }

        this.toggleToolbar = this.toggleToolbar.bind(this);

    }

    toggleToolbar(e) {
        e.preventDefault();
        if (this.state.isOpen) {
            this.setState({ isOpen: null });
        } else {
            this.setState({ isOpen: " open" });
        }
    }

    render() {
        const {
            history,
            server,
            currentUserId,
            membershipId,
            deleteServer,
            updateServer,
            leaveServer,
            createInvite,
        } = this.props;
        debugger
        return (
            <div className="st-wrapper">
                <button 
                    type="button"
                    onClick={this.toggleToolbar}>
                    <i 
                        id="st-chevron"
                        className={ this.state.isOpen ? `fas fa-chevron-down` : `fas fa-chevron-right`}></i>
                    {server.name}
                </button>
                { this.state.isOpen ? (
                <ul id="server-tools" className="st-closed">
                    <li>
                        <CreateServerInvite createInvite={createInvite} />
                    </li>
                    { server.ownerId === currentUserId ? (
                    <>
                        <ServerUpdateForm server={server} updateServer={updateServer}/>
                        <ServerDeleteButton deleteServer={() => deleteServer(server.id)}/>
                    </>
                    ) : (
                        <ServerLeaveButton leaveServer={leaveServer} membershipId={membershipId} />
                    ) }
                </ul>
                ) : null }
            </div>
        )
    }

}

export default ServerToolbar;