import React, { Component } from 'react';
import MemberListItem from './member_list_item';
import { membersAlphaAsc } from '../../../../../../utils/func_utils';

class ServerMembersList extends Component {
    constructor(props) {
        super(props);
        this.members = {};
        this.closeMemberOptions = this.closeMemberOptions.bind(this);
        this.handleTransferOwnership = this.handleTransferOwnership.bind(this);
    }

    componentDidMount() {
        const members = document.getElementsByClassName("m-item");
        for(let member of members) {
            member.addEventListener('contextmenu', e => {
                e.preventDefault();
                this.members[`${member.innerText.split("\n")[1].split("@")[1]}`] = member;
                const rect = member.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const memberOptions = document.getElementById(`member-options-${member.innerText.split("\n")[1].split("@")[1]}`);
                memberOptions.style.top = `${y+memberOptions.offsetHeight-14}px`;
                memberOptions.style.left = `${x}px`;
                memberOptions.classList.remove('hidden');
                document.addEventListener('mousedown', e => {
                    e.preventDefault();
                    const clickedOutside = !memberOptions.contains(e.target);
                    if (clickedOutside) {
                        memberOptions.classList.add("hidden");
                        document.removeEventListener('click', this.closeMemberOptions);
                    }
                });
            });

        }
    }

    componentWillUnmount() {
        const members = document.getElementsByClassName("m-item");
        for(let member of members) {
            member.removeEventListener('contextmenu', e => {
                e.preventDefault();
                this.members[`${member.innerText.split("\n")[1].split("@")[1]}`] = member;
                const rect = member.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const memberOptions = document.getElementById(`member-options-${member.innerText.split("\n")[1].split("@")[1]}`);
                memberOptions.style.top = `${y}px`;
                memberOptions.style.left = `${x}px`;
                memberOptions.classList.remove('hidden');
                document.removeEventListener('mousedown', e => {
                    e.preventDefault();
                    const clickedOutside = !memberOptions.contains(e.target);
                    if (clickedOutside) {
                        memberOptions.classList.add("hidden");
                        document.removeEventListener('click', this.closeMemberOptions);
                    }
                });
            });
        }
    }

    closeMemberOptions(e) {
        const members = document.getElementsByClassName("m-item");
        for(let member of members) {
            const memberOptions = document.getElementById(`member-options-${member.innerText.split("\n")[1].split("@")[1]}`);
            document.removeEventListener('mousedown', e => {
                e.preventDefault();
                const clickedOutside = !memberOptions.contains(e.target);
                if (clickedOutside) {
                    memberOptions.classList.add("hidden");
                    document.addEventListener('click', this.closeMemberOptions);
                }
            });
        }
    }

    handleTransferOwnership(memberId) {
        const { transferOwnership, closeModal } = this.props;
        const server = Object.assign({}, this.props.server);
        server.ownerId = memberId;
        closeModal();
        transferOwnership(server);
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
                                    key={ `m-${member.id}-${server.id}` }
                                    member={ member }
                                    server={ server }
                                    isOwner={ isOwner }
                                    kickMember={ () => kickMember(member.membershipId) }
                                    transferOwnership={ () => this.handleTransferOwnership(member.id) }
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