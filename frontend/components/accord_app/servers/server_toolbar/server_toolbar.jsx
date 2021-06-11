import React, { Component } from 'react';
import ServerToolbarMenu from './server_toolbar_menu';


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

    // componentDidMount() {
    //     document.addEventListener('mousedown', this.handleClickOutside);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('mousedown', this.handleClickOutside);
    // }

    handleClickOutside(e) {
        if (this.stWrapperRef && !this.stWrapperRef.current.contains(e.target)) {
            this.closeToolbar();
        }
    }

    closeToolbar() {
        const fadeIn = document.getElementsByClassName("fade-in");
        if (fadeIn) {
            document.getElementById("st-dropdown-button").classList.remove("dropped");
            document.getElementById("st-chevron").classList.remove("fade-in");
            document.getElementById("st-x").classList.remove("fade-in");
            document.getElementById("server-tools-wrapper").classList.remove("fade-in");
            document.getElementById("server-tools-wrapper").classList.add("fade-out");
        }
    }

    toggleToolbar(e) {
        e.preventDefault();
        e.currentTarget.classList.toggle("dropped");
        document.getElementById("st-chevron").classList.toggle("fade-in");
        document.getElementById("st-x").classList.toggle("fade-in");
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
            invitation,
            removeInvitation,
            openModal,
            openFullModal,
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
                        onMouseDown={ this.toggleToolbar }>
                            { server.name }
                        <i 
                            id="st-chevron"
                            className={`fas fa-chevron-down`}></i>
                        <h6 id="st-x">+</h6>
                    </button>
                        <section
                            id="server-tools-wrapper"
                            className="server-tools-wrapper fade-out"
                            // onBlur={this.closeToolbar}
                            ref={this.stWrapperRef}>
                            <ServerToolbarMenu
                                isOwner={ server.ownerId === currentUserId ? true : false }
                                server={ server }
                                openModal={ openModal }
                                openFullModal={ openFullModal }
                                closeToolbar={ this.closeToolbar }
                                invitation={ invitation }
                                removeInvitation={ removeInvitation }
                                currentUserId={ currentUserId }
                                membershipId={ membershipId }
                                updateServer={ updateServer }
                                deleteServer={ () => deleteServer(server.id) }
                                leaveServer={ () => leaveServer(membershipId) }
                                createInvite={ () => createInvite(server.id) }
                                history={ this.props.history }
                            />
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