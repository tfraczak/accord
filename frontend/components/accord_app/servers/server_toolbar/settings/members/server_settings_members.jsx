import React, { Component } from 'react';
import MemberListItem from './member_list_item';
import { convertToSnakeCase } from '../../../../../../utils/func_utils';

class ServerMembersList extends Component {
    constructor(props) {
        super(props);
        this.closeMemberOptions = this.closeMemberOptions.bind(this);
        this.handleContext = this.handleContext.bind(this);
        this.handleTransferOwnership = this.handleTransferOwnership.bind(this);
    }

    handleContext(member) {
        return e => {
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const memberOptions = document.getElementById(`member-options-${member.username}#${member.usernameId}`);
            memberOptions.style.top = `${y+memberOptions.offsetHeight-14}px`;
            memberOptions.style.left = `${x}px`;
            memberOptions.classList.remove('hidden');
            document.addEventListener('mousedown', this.closeMemberOptions(memberOptions));
        }
    }

    closeMemberOptions(memberOptions) {
        return e => {
            const clickedOutside = !memberOptions.contains(e.target);
            if (clickedOutside) {
                memberOptions.classList.add("hidden");
                document.removeEventListener('mousedown', this.closeMemberOptions(memberOptions));
            }
        }
    }

    handleTransferOwnership(member) {
        const {
            transferOwnership,
            closeModal,
            server,
        } = this.props;
        
        const formData = new FormData();
        formData.append('server[owner_id]', member.id);
        
        const memberOptions = document.getElementById(`member-options-${member.username}#${member.usernameId}`);
        memberOptions.classList.add('hidden');
        document.removeEventListener('mousedown', this.closeMemberOptions(memberOptions));
        closeModal();
        
        transferOwnership(formData, server.id);
    }

    render() {
        const {
            serverMembers,
            server,
            isOwner,
            kickMember,
        } = this.props;
        if (serverMembers && server) {
            return (
                <section className="members-list-wrapper">
                    <header className="content-header">
                        <h1 className="content-title">Server Members</h1>
                        <h3 className="num-members">{`${serverMembers.length} Members`}</h3>
                    </header>
                    <ul className="member-list">
                        <div className="separator" />
                        { 
                            serverMembers.map(member => (
                                <MemberListItem
                                    handleContext={ this.handleContext(member) }
                                    key={ `m-${member.id}-${server.id}` }
                                    member={ member }
                                    server={ server }
                                    isOwner={ isOwner }
                                    kickMember={ () => kickMember(member.membershipId) }
                                    transferOwnership={ () => this.handleTransferOwnership(member) }
                                />
                            ))
                        }
                    </ul>
                </section>
            )
        } else {
            return <div></div>
        }
    }
}

export default ServerMembersList;