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
        this.setToolbarRef = this.setToolbarRef.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.setDropdownBtnRef = this.setDropdownBtnRef.bind(this);
        this.setChevronRef = this.setChevronRef.bind(this);
        this.setXRef = this.setXRef.bind(this);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    setToolbarRef(node) {
        this.toolbarRef = node;
    }

    setChevronRef(node) {
        this.chevronRef = node;
    }

    setXRef(node) {
        this.xRef = node;
    }

    setDropdownBtnRef(node) {
        this.dropdownBtnRef = node;
    }

    closeToolbar() {
        const {
            chevronRef,
            xRef,
            wrapperRef,
            dropdownBtnRef
        } = this;

        const fadeIn = document.getElementsByClassName("fade-in");
        if (fadeIn) {
            dropdownBtnRef.classList.remove("dropped");
            dropdownBtnRef.classList.remove("open");
            chevronRef.classList.remove("fade-in");
            xRef.classList.remove("fade-in");
            wrapperRef.classList.remove("fade-in");
            wrapperRef.classList.add("fade-out");
        }
    }

    toggleToolbar(e) {
        e.preventDefault();

        const {
            chevronRef,
            xRef,
            wrapperRef,
        } = this;

        e.currentTarget.classList.toggle("dropped");
        chevronRef.classList.toggle("fade-in");
        xRef.classList.toggle("fade-in");
        // const fadeIn = document.getElementsByClassName("fade-in");
        if (e.currentTarget.classList.contains("dropped")) {
            wrapperRef.classList.add("fade-in");
            wrapperRef.classList.remove("fade-out");
        } else {
            wrapperRef.classList.add("fade-out");
            wrapperRef.classList.remove("fade-in");
        }
        // if (fadeIn.length) {
        //     wrapperRef.classList.toggle("fade-out")
        // } else {
        //     wrapperRef.classList.toggle("fade-in")
        // }
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
            serverSub,
        } = this.props;

        if(server) {
            
            return (
                <section
                    className="st-wrapper">
                    <button
                        ref={ this.setDropdownBtnRef }
                        id="st-dropdown-button"
                        className={`st-dropdown-btn`}
                        type="button"
                        onMouseDown={ this.toggleToolbar }>
                            { server.name }
                        <i 
                            ref={this.setChevronRef}
                            id="st-chevron"
                            className={`fas fa-chevron-down`}></i>
                        <h6 ref={this.setXRef} id="st-x">+</h6>
                    </button>
                        <section
                            ref={ this.setWrapperRef }
                            id="server-tools-wrapper"
                            className="server-tools-wrapper fade-out"
                        >
                            <ServerToolbarMenu
                                isOwner={ server.ownerId === currentUserId ? true : false }
                                server={ server }
                                openModal={ openModal }
                                openFullModal={ openFullModal }
                                closeToolbar={ this.closeToolbar }
                                wrapperRef={ this.wrapperRef }
                                dropdownBtnRef={ this.dropdownBtnRef }
                                invitation={ invitation }
                                removeInvitation={ removeInvitation }
                                currentUserId={ currentUserId }
                                membershipId={ membershipId }
                                updateServer={ updateServer }
                                deleteServer={ () => deleteServer(server.id) }
                                leaveServer={ () => leaveServer(membershipId) }
                                createInvite={ () => createInvite(server.id) }
                                history={ history }
                                serverSub={ serverSub }
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
        } = this.props;
        
        return (
            <>
                { server ? this.renderServer() : history.push("/channels/@me") }
            </>
        )
    }

}

export default ServerToolbar;