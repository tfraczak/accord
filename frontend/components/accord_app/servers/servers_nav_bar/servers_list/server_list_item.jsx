import React from 'react';
import { NavLink } from 'react-router-dom';
import { serverInitials } from '../../../../../utils/func_utils';

export default props => {

    const imgUrl = props.server.imgUrl;
    const name = props.server.name;
    const id = props.server.id;

    const insertServerImg = () => {
        if (imgUrl) {
            return <img src={imgUrl} key={`i-${id}`} alt={`img-${name}-${id}`} />
        } else {
            return (
                <h1 className="default-server-icon">
                    {serverInitials(name).slice(0,5)}
                </h1>
            );
        }
    }
    const imgSrc = imgUrl || window.defaultAvatarUrl;

    return (
        <li className={`server`} key={`s-${id}`} >
            <NavLink to={`/channels/${id}`}>
                {insertServerImg()}
            </NavLink>
        </li>
    )
};
