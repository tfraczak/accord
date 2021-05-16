import React from 'react';
import { NavLink } from 'react-router-dom';
import ServerListItem from './servers_list/server_list_item';
import AddServerButton from './add_server/add_server_button';

export default props => {

    const { servers, getServerByInvite, openModal } = props;
    return (
        <nav className="servers-profile-nav">
            <ul className="nav-list">
                <li className="profile" key="profile-li">
                    <NavLink className="profile-link" to="/channels/@me">
                        <img src={window.defaultAvatarUrl} alt="profile-img" className="profile-link" />
                    </NavLink>
                </li>
                <li className="profile-servers-separator" key="servers-list-separator-1">
                    <div></div>
                </li>
                { servers.map(server => <ServerListItem server={ server } />) }
                <AddServerButton id="asf-button" openModal={openModal} getServerByInvite={getServerByInvite} />
                {/* <li className="explore-servers"></li> */}
            </ul>
        </nav>
    )

};