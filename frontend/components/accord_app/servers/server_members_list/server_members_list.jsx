import React, { Component } from 'react';
import MemberListItem from './member_list_item';

class ServerMembersList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { serverMembers } = this.props;
        if (serverMembers) {
            return ( 
                <div className="members-list-wrapper">
                    <h3 className="ml-title">MEMBERS - {serverMembers.length}</h3>
                    <ul className="ml-ul">
                        { serverMembers.map(member => <MemberListItem member={member} />) }
                    </ul>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default ServerMembersList;