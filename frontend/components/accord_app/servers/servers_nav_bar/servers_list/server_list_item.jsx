import React from 'react';
import { NavLink } from 'react-router-dom';

export default props => {

    const imgUrl = props.server.imgUrl;
    const name = props.server.name;
    const id = props.server.id;

    const serverInitials = name => {
        let newName;
        if (name.includes(" ")) {
            newName = name.split(" ").map(word => word[0]).join("");
        } else if (name.includes("-")) {
            newName = name.split("-").map(word => {
                for (let i=0; i < word.length; i++) {
                    if (word[i] !== " ") return word[i];
                }
            }).join("-");
        }
        return newName;
    };
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
