import React from "react";
import { Link } from "react-router-dom";
import CanvasBackground from '../canvas_background/canvas_background';

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
    // const inlineBgImg = {backgroundImage: `url(${window.brokenBg})`};

    return (
        <>
            <div className="bg-container">
                <CanvasBackground
                    numStars={ 50 }
                    numBackFlakes={ 600 }
                    numFrontFlakes={ 400 }
                    bgUrl={ window.error404Img }
                />
            </div>
            <div className="error-404-wrapper">
                <h1>404</h1>
                <p>{errMsg()}</p>
                <Link to="/app" >Let's get you back home...</Link>
            </div>
        </>
    )
};