import React, { Component } from 'react';
import MemberListItem from './member_list_item';

class ServerMembersList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { serverMembers, server } = this.props;
        if (serverMembers) {
            return ( 
                <div className="members-list-wrapper">
                    <h3 className="ml-title">MEMBERS - {serverMembers.length}</h3>
                    <ul className="ml-ul">
                        { serverMembers.map(member => <MemberListItem key={ `ml-${member.id}-${server.id}` } member={member} server={server} />) }
                    </ul>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default ServerMembersList;