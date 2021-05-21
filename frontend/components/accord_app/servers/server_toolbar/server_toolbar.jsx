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
        if (this.stWrapperRef && !this.stWrapperRef.current.contains(e.target)) {
            this.closeToolbar();
        }
    }

    closeToolbar() {
        // const fadeIn = document.getElementsByClassName("fade-in")
        // if (fadeIn) {
        //     document.getElementById("st-dropdown-button").classList.remove("dropped");
        //     document.getElementById("st-chevron").classList.remove("fade-in");
        //     document.getElementById("server-tools-wrapper").classList.remove("fade-in");
        //     document.getElementById("server-tools-wrapper").classList.add("fade-out");
        // }
    }

    toggleToolbar(e) {
        e.preventDefault();
        
        e.currentTarget.classList.toggle("dropped");
        document.getElementById("st-chevron").classList.toggle("fade-in");
        const fadeIn = document.getElementsByClassName("fade-in");
        if (fadeIn) {
            document.getElementById("server-tools-wrapper").classList.toggle("fade-out")
        } else {
            document.getElementById("server-tools-wrapper").classList.toggle("fade-in")
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
                <section
                    className="st-wrapper">
                    <button
                        id="st-dropdown-button"
                        className={`st-dropdown-btn`}
                        type="button"
                        onClick={ this.toggleToolbar }>
                            { server.name }
                        <i 
                            id="st-chevron"
                            className={`fas fa-chevron-left`}></i>
                    </button>
                        <section
                            id="server-tools-wrapper"
                            className="server-tools-wrapper fade-out"
                            onBlur={this.closeToolbar}
                            ref={this.stWrapperRef}>
                                
                            <ul id="server-tools" className="st-closed">
                                <CreateServerInvite
                                    key={`createinvite-${server.id}`}
                                    createInvite={createInvite}
                                    invite={urlToken} 
                                    serverId={server.id}
                                    removeInvitation={removeInvitation}
                                    params={params}
                                    history={history} />
                                { server.ownerId === currentUserId ? (
                                <>
                                    <ServerUpdateForm key={`updateserver-${server.id}`} history={history} server={server} updateServer={updateServer}/>
                                    <ServerDeleteButton key={`deleteserver-${server.id}`} history={history} deleteServer={() => deleteServer(server.id, history)}/>
                                </>
                                ) : (
                                    <ServerLeaveButton key={`serverleave-${server.id}`} history={history} leaveServer={leaveServer} membershipId={membershipId} />
                                ) }
                            </ul>
                        </section> 
                </section>
            )
        } else {
            history.push('/channels/@me')
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