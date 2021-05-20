import React from 'react';
import { NavLink } from 'react-router-dom';
import ServerListItem from './servers_list/server_list_item';
import AddServerButton from './add_server/add_server_button';

export default props => {
    const classRemoveClick = e => {
        const servers = document.getElementsByClassName("server-item");
        for (let server of servers) { server.classList.remove("active") }
        e.currentTarget.classList.add("active");
        props.history.push(`/channels/@me`);
    }
    const { servers, getServerByInvite, openModal } = props;
    return (
        <nav className="servers-profile-nav">
            <ul className="nav-list">
                <li className="profile" key="profile-li">
                    <a id="profile" onClick={classRemoveClick} className="profile-link" to="/channels/@me">
                        <img src={window.defaultAvatarUrl} alt="profile-img" className="profile-link" />
                    </a>
                </li>
                <li className="profile-servers-separator" key="servers-list-separator-1">
                    <div></div>
                </li>
                { servers.map(server => <ServerListItem key={`server-${server.id}`} server={ server } />) }
                <AddServerButton id="asf-button" openModal={openModal} getServerByInvite={getServerByInvite} />
                {/* <li className="explore-servers"></li> */}
            </ul>
        </nav>
    )

};