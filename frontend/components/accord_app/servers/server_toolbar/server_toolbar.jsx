import React, { Component } from 'react';
import ServerUpdateForm from './server_update_form';
import ServerDeleteButton from './server_delete_button';


class ServerToolbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: null,
            
        }

        this.toggleToolbar = this.toggleToolbar.bind(this);

    }

    toggleToolbar() {
        if (this.state) {
            this.setState({ isOpen: null });
        } else {
            this.setState({ isOpen: " open" });
        }
    }

    render() {
        const {
            server,
            currentUserId,
            membershipId,
            deleteServer,
            updateServer,
            leaveServer,
        } = this.props;
        return (
            <div className="st-wrapper">
                <button 
                    type="button"
                    onClick={this.toggleToolbar}>
                    {server.name}
                    <i id="st-chevron" className={`fas fa-chevron-left${this.state.isOpen}`}></i>
                </button>
                { this.state.isOpen ? (
                <ul id="server-tools" className="st-closed">
                    <li>
                        <input 
                            type="text"
                            disabled
                            />
                        <button></button>
                    </li>
                    { server.ownerId === currentUserId ? (
                    <>
                        <ServerUpdateForm updateServer={updateServer}/>
                        <ServerDeleteButton deleteServer={() => deleteServer(server.id)}/>
                    </>
                    ) : (
                        <ServerLeaveButton leaveServer={() => leaveServer(membershipId, currentUserId)} />
                    ) }
                </ul>
                ) : null }
            </div>
        )
    }

}