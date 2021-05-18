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
        this.stWrapperRef = React.createRef();
        this.toggleToolbar = this.toggleToolbar.bind(this);
        this.closeToolbar = this.closeToolbar.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            this.closeToolbar();
        }
    }

    closeToolbar() {
        const fadeIn = document.getElementsByClassName("fade-in")
        if (fadeIn) {
            document.getElementById("server-tools-wrapper").classList.remove("fade-in");
            document.getElementById("server-tools-wrapper").classList.add("fade-out");
        }
    }

    toggleToolbar(e) {
        e.preventDefault();
        const fadeIn = document.getElementsByClassName("fade-in")
        if (fadeIn) {
            document.getElementById("server-tools-wrapper").classList.toggle("fade-out")
        } else {
            document.getElementById("server-tools-wrapper").classList.toggle("fade-in")
        }
        // const currentSetting = this.state.isOpen;
        // this.setState({ isOpen: !currentSetting });
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
                <div
                    className="st-wrapper">
                    <button
                        className={ this.state.isOpen ? `st-dropdown-btn dropped` : `st-dropdown-btn` }
                        type="button"
                        onClick={ this.toggleToolbar }>
                            { server.name }
                        <i 
                            id="st-chevron"
                            className={ this.state.isOpen ? `fas fa-chevron-down` : `fas fa-chevron-left`}></i>
                    </button>
                        <div
                            id="server-tools-wrapper"
                            className="server-tools-wrapper fade-out"
                            tabIndex="0"
                            onBlur={this.closeToolbar}
                            ref={this.stWrapperRef}>
                                
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
                        </div> 
                    {/* { this.state.isOpen ? (
                        <div
                            className="server-tools-wrapper"
                            tabIndex="0"
                            onBlur={this.closeToolbar}
                            ref={this.stWrapperRef}>

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
                        </div>
                    ) : null }   */}
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