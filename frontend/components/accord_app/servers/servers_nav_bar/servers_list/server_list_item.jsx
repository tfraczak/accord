import React from 'react';
import { receiveServerSub } from '../../../../../actions/socket_actions';
import { serverInitials } from '../../../../../utils/func_utils';
import { createServerSub } from "../../../../../utils/socket_utils";

class ServerListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.server;
        this.insertServerIcon = this.insertServerIcon.bind(this);
        this.classRemoveClick = this.classRemoveClick.bind(this);
        if (!props.serverSub) {
            this.subscription = props.createServerSub(props.server, props.currentUser, props.history);
            props.receiveServerSub({
                server: props.server,
                serverSub: this.subscription,
            });
        } else {
            this.subscription = props.serverSub;
        }

    }

    classRemoveClick(e) {
        const { id, imageUrl, name } = this.props.server;
        const { defaultChannelId } = this.props;
        const servers = document.getElementsByClassName("server-item");
        for (let server of servers) { server.classList.remove("active") }
        const profile = document.getElementById("profile");
        profile.classList.remove("active");
        e.currentTarget.classList.add("active");
        this.props.history.push(`/channels/${id}/${defaultChannelId}`);
    }

    insertServerIcon() {
        const { imageUrl, id, name } = this.props.server;

        if (imageUrl) {
            return (
                <img
                    className="server-icon img"
                    src={ imageUrl }
                    key={ `i-${id}`}
                    alt={`img-${name}-${id}`}
                />
            )
        } else {
            return (
                <h1 className="server-icon default">
                    { serverInitials(name) }
                </h1>
            );
        }
    }

    render() {
        const {
            imageUrl,
            name,
            id,
        } = this.props.server;
        const {
            defaultChannelId,
        } = this.props;
        const itemClassName = imageUrl ? "server-item image-present" : "server-item no-image";
        return (
            <li className={`server`}>
                <a
                    id={`server-item-${id}`}
                    onClick={this.classRemoveClick}
                    to={`/channels/${id}/${defaultChannelId}`}
                    className={ itemClassName }
                >
                    { this.insertServerIcon() }
                </a>
            </li>
        )
    }
}

// const ServerListItem = props => {

//     const classRemoveClick = e => {
//         const servers = document.getElementsByClassName("server-item");
//         for (let server of servers) { server.classList.remove("active") }
//         const profile = document.getElementById("profile");
//         profile.classList.remove("active");
//         e.currentTarget.classList.add("active");
//         props.history.push(`/channels/${id}/${props.defaultChannelId}`);
//     }
//     const imageUrl = props.server.imageUrl;
//     const name = props.server.name;
//     const id = props.server.id;
//     const itemClassName = imageUrl ? "server-item image-present" : "server-item no-image";

//     const insertServerIcon = () => {
//         if (imageUrl) {
//             return <img className="server-icon img" src={imageUrl} key={`i-${id}`} alt={`img-${name}-${id}`} />
//         } else {
//             return (
//                 <h1 className="server-icon default">
//                     { serverInitials(name) }
//                 </h1>
//             );
//         }
//     }

//     return (
        
//     )
// };

export default ServerListItem;

