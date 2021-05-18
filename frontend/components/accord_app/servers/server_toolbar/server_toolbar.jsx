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

    renderServer() {
        const {
            history,
            server,
            currentUserId,
            membershipId,
            deleteServer,
            updateServer,
            leaveServer,
            createInvite,
            urlToken,
            removeInvitation,
        } = this.props;

        const params = this.props.match.params;
        if(server) {
            return (
                <div className="st-wrapper">
                    <button
                        className={ this.state.isOpen ? `st-dropdown-btn dropped` : `st-dropdown-btn` }
                        type="button"
                        onClick={this.toggleToolbar}>
                            { server.name }
                        <i 
                            id="st-chevron"
                            className={ this.state.isOpen ? `fas fa-chevron-down` : `fas fa-chevron-left`}></i>
                    </button>
                    { this.state.isOpen ? (
                    <ul id="server-tools" className="st-closed">
                        <CreateServerInvite 
                            createInvite={createInvite}
                            invite={urlToken} 
                            serverId={server.id}
                            removeInvitation={removeInvitation}
                            params={params} />
                        { server.ownerId === currentUserId ? (
                        <>
                            <ServerUpdateForm server={server} updateServer={updateServer}/>
                            <ServerDeleteButton deleteServer={() => deleteServer(server.id).then(() => history.push("/channels/@me"))}/>
                        </>
                        ) : (
                            <ServerLeaveButton history={history} leaveServer={leaveServer} membershipId={membershipId} />
                        ) }
                    </ul>
                    ) : null }  
                </div>
            )
        } else {
            history.push('/app')
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
        
        return (
            <>
                { server ? this.renderServer() : history.push('/app') }
            </>
        )
    }

}

export default ServerToolbar;