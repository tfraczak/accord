import React from 'react';
import ServerListItemContainer from './servers_list/server_list_item_container';
import AddServerButton from './add_server/add_server_button';

class ServersNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.classRemoveClick = this.classRemoveClick.bind(this);
    }

    componentDidMount() {
        const location = this.props.history.location.pathname.split("/")[2];
        if (location === "@me") {
            const profileTile = document.getElementById("profile");
            profileTile.classList.add("active");
        } else {
            const serverTile = document.getElementById(`server-item-${location}`);
            serverTile.classList.add("active");
        }
    }

    componentWillUnmount() {
        const path = this.props.history.location.pathname;
        if (!path.includes("/channels")) {
            this.props.removeServerSubs();
        }
    }

    classRemoveClick(e) {
        const servers = document.getElementsByClassName("server-item");
        for (let server of servers) { server.classList.remove("active") }
        e.currentTarget.classList.add("active");
        this.props.history.push(`/channels/@me`);
    }

    render() {
        const { servers, openModal } = this.props;
        return (
            <nav className="servers-profile-nav">
                <ul className="nav-list">
                    <li className="profile">
                        <a id="profile" onClick={this.classRemoveClick} className="profile-link" to="/channels/@me">
                            <img src={window.defaultAvatarUrl} alt="profile-img" className="profile-link" />
                        </a>
                    </li>
                    <li className="profile-servers-separator" key="servers-list-separator-1">
                        <div></div>
                    </li>
                    { servers.map(server => <ServerListItemContainer key={`server-${server.id}`} server={ server } />) }
                    <AddServerButton id="asf-button" openModal={openModal} />
                    {/* <li className="explore-servers"></li> */}
                </ul>
            </nav>
        );
    }


}

export default ServersNavBar;