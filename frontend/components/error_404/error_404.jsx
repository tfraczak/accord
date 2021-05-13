import React from "react";
import { Link } from "react-router-dom";

export default props => {
    const errMsgs = [
        "How did I get here?",
        "Tsk tsk, bad, url path!",
        "What you were looking for doesn't exist...",
        "Hello! Nothing to see here!",
    ];

    const errMsg = () => {
        const i = Math.floor(Math.random() * errMsgs.length);
        return errMsgs[i];
    };

    const inlineBgImg = {backgroundImage: `url(${window.backgroundImg})`};

    return (
        <>
            <div className="bg-container" style={inlineBgImg}></div>
            <div className="error-404-wrapper">
                <h1>404</h1>
                <p>{errMsg()}</p>
                <Link to="/" >Let's get you back home...</Link>
            </div>
        </>
    )
};