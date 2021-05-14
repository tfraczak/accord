import React from 'react';
import ServerListItem from './server_list_item';
import { NavLink } from 'react-router-dom';

class AccordApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.servers.length) {
            this.props.retrieveUserServers(this.props.currentUserId);
        }
    }

    render() {
        const servers = this.props.servers
        return (
            <div className="webapp-wrapper">
                <nav className="servers-profile-nav">
                    <ul className="nav-list">
                        <li className="profile">
                            <NavLink className="profile-li" to="/channels/@me">
                                <img src={window.defaultAvatarUrl} alt="profile-link" className="profile-link" />
                            </NavLink>
                        </li>
                        <li className="profile-servers-separator">
                            <div></div>
                        </li>
                        { servers.map(server => <ServerListItem server={ server } />) }
                        <li className="add-server">

                        </li>
                        <li className="explore-servers">

                        </li>
                    </ul>
                </nav>
                <div className="base wrapper">
                    <div className="content wrapper">

                        <div className="sidebar-wrapper">
                            <nav className="sidebar-nav">
                                <div className="sb-header wrapper">
                                    <header className="sb-header"></header>
                                </div>
                                <div className="focus-channels-dms">
                                
                                </div>
                            </nav>
                            <div className="sidebar-current-user"></div>
                        </div>

                        <div className="focus">
                            <div className="focus-title-bar">
                                <div className="focus-title"></div>
                                <div className="title-toolbar"></div>
                            </div>
                            <div className="focus-content">
                                <div className="main-focus">
                                    <div className="messages-wrapper"></div>
                                    <form className="message-form">
                                        <input className="message-input" type="text" placeholder="Message" />
                                    </form>
                                </div>
                                <div className="focus-right-wrapper"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}


export default AccordApp;