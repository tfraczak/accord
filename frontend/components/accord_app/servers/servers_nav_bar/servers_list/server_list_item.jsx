import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { serverInitials } from '../../../../../utils/func_utils';
import { serverChannels } from "../../../../../utils/selectors";

const mSTP = (state, ownProps) => {
    const channels = serverChannels(ownProps.server, state.entities.channels);
    const defaultChannelId = channels[0].id;
    
    return {
        defaultChannelId
    }
};

const mDTP = dispatch => ({});

const ServerListItem = props => {

    const classRemoveClick = e => {
        const servers = document.getElementsByClassName("server-item");
        for (let server of servers) { server.classList.remove("active") }
        const profile = document.getElementById("profile");
        profile.classList.remove("active");
        e.currentTarget.classList.add("active");
        props.history.push(`/channels/${id}/${props.defaultChannelId}`);
    }
    const imgUrl = props.server.imgUrl;
    const name = props.server.name;
    const id = props.server.id;

    const insertServerImg = () => {
        if (imgUrl) {
            return <img className="server-icon img" src={imgUrl} key={`i-${id}`} alt={`img-${name}-${id}`} />
        } else {
            return (
                <h1 className="server-icon default">
                    { serverInitials(name) }
                </h1>
            );
        }
    }
    const imgSrc = imgUrl || window.defaultAvatarUrl;

    return (
        <li className={`server`}>
            <a onClick={classRemoveClick} to={`/channels/${id}/${props.defaultChannelId}`} className="server-item">
                {insertServerImg()}
            </a>
        </li>
    )
};

export default withRouter(connect(mSTP, mDTP)(ServerListItem));

