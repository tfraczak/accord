import React, { Component } from 'react';
import MemberListItem from './member_list_item';

class ServerMembersList extends Component {
    constructor(props) {
        super(props);
        this.closeMemberMenu = this.closeMemberMenu.bind(this);
        this.handleContext = this.handleContext.bind(this);
        this.handleKick = this.handleKick.bind(this);
    }

    handleContext(member) {
        return e => {
            e.preventDefault();
            const mem = document.getElementById(`ml-item-${member.id}`);
            mem.classList.add("active");
            const memberMenu = document.getElementById(`member-menu-${member.username}#${member.usernameId}`);
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left - memberMenu.offsetWidth;
            const y = e.clientY - rect.top;
            memberMenu.style.top = `${y}px`;
            memberMenu.style.left = `${x}px`;
            memberMenu.classList.remove('hidden');
            document.addEventListener('mousedown', this.closeMemberMenu(memberMenu, mem));
        };
    }

    closeMemberMenu(memberMenu, mem) {
        return e => {
            const clickedOutside = !memberMenu.contains(e.target);
            if (clickedOutside) {
                mem.classList.remove("active");
                memberMenu.classList.add("hidden");
                document.removeEventListener('mousedown', this.closeMemberMenu(memberMenu));
            }
        };
    }

    handleKick(member) {
        const {
            serverSub,
            currentUserId,
        } = this.props;
        
        const memberMenu = document.getElementById(`member-menu-${member.username}#${member.usernameId}`);
        memberMenu.classList.add("hidden");
        document.removeEventListener('mousedown', this.closeMemberMenu(memberMenu));
        
        const cableData = {
            member,
            currentUserId
        };

        serverSub.kickMember(cableData, serverSub);
    }

    render() {
        const {
            serverMembers,
            server,
            currentUserId,
            openModal,
            createConversation,
            createdConvo,
            removeCreatedConvo
        } = this.props;

        const isOwner = server.ownerId === currentUserId;

        if (serverMembers) {
            return ( 
                <div className="members-list-wrapper">
                    <h3 className="ml-title">MEMBERS - {serverMembers.length}</h3>
                    <ul className="ml-ul">
                        { serverMembers.map(
                            member => (
                                <MemberListItem 
                                    key={ `ml-${member.id}-${server.id}` }
                                    server={ server }
                                    member={ member }
                                    menuId={ `member-menu-${member.username}#${member.usernameId}` }
                                    kickMember={ () => this.handleKick(member) }
                                    handleContext={ this.handleContext(member) }
                                    isOwner={ isOwner }
                                    openModal={ openModal }
                                    createConversation={ createConversation }
                                    removeCreatedConvo={ removeCreatedConvo }
                                    currentUserId={ currentUserId }
                                    createdConvo={ createdConvo }
                                />
                            )
                        ) }
                    </ul>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default ServerMembersList;