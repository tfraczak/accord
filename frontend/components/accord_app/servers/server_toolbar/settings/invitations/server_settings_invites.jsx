import React, { Component } from 'react';
import InviteListItem from './invite_list_item';

class ServerSettingsInvites extends Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        const {
            serverInvites,
            server,
            deleteInvite,
        } = this.props;
        if (serverInvites && server) {
            return (
                <section className="invites-list-wrapper">
                    <header className="content-header">
                        <h1 className="content-title">Invites</h1>
                        <h3 className="content-subtitle">Here's a list of all active invite links. You can revoke any one.</h3>
                    </header>
                    <div className="separator" />
                    <section className="list-header">
                        <div className="inviter category">INVITER</div>
                        <div className="invite-code category">INVITE CODE</div>
                        <div className="expires category">EXPIRES</div>
                    </section>
                    { 
                        serverInvites.map(invite => (
                            <InviteListItem
                                key={ `invite-${invite.id}-${server.id}` }
                                invite={ invite }
                                inviter={ invite.inviter }
                                server={ server }
                                deleteInvite={ () => deleteInvite(invite) }
                            />
                        ))
                    }
                </section>
            )
        } else {
            return <div></div>
        }
    }
}

export default ServerSettingsInvites;