import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
    const { divNum } = props;

    
    switch (divNum) {
        case 1:
            return (
                <div className="div-1">
                    <h1 className="title">Your place to chat</h1>
                    <p className="desc">Whether you’re part of a fishing club, programming bootcamp, worldwide hot sauce community, or just a handful of aquaintances that want to lurk around each other, Accord makes it easy to chat every day and connect more often.</p>
                    <div className="session-links">
                        { props.loggedIn ? (
                                <Link className="open-accord" to="/app">Open Accord</Link>
                        ) : (
                            <>
                                <Link className="login-link" to="/login"><i className="fas fa-sign-in-alt"></i>Login</Link>
                                <Link className="register-link" to="/register">Create an account</Link>
                            </>
                        ) }
                        
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="div-2">
                    <img src={window.splash2} alt="ph-img" />
                    <div className="title-desc">
                        <h1 className="title">A clone of <a href="https://discord.com" target="_blank">Discord</a>, a popular social communication app</h1>
                        <p className="desc">Just like Discord, Accord servers are organized by topic-based channels, where you can chat, share, or whatever you'd like to talk about wihout being bombarded by a group chat.</p>
                    </div>
                </div>
            )
        case 3:
            return (
                <div className="div-3">
                    <div className="title-desc">
                        <h1 className="title">The tech involved with Accord</h1>
                        <p className="desc">Grab a seat, and check out a sampling of all the tech used to build Accord. Please enjoy a real code snippet from the app as well!</p>
                    </div>
                    <img src={window.splash3} alt="ph-img" />
                </div>
            )
        case 4:
            return (
                <div className="div-4">
                    <img src={window.splash4} alt="ph-img" />
                    <div className="title-desc">
                        <h1 className="title">A little bit about myself</h1>
                        <p className="desc">There are a few things I learned along the way, and here are some of them. I'm also the owner of <a href="https://pepplish.com" target="_blank">Pepplish Provisions</a>, a hot sauce company based in NYC.</p>
                    </div>
                </div>
            )
        case 5:
            return (
                <div className="div-5">
                    <h1 className="title">Take a brief look at my projects</h1>
                    <p className="desc">Like what you see? You can shoot me an email at <a href="mailto: tfraczak@gmail.com" target="_blank">tfraczak@gmail.com</a> or call me at <a href="tel:3477702444">347-770-2444</a>. <br /> Be on the lookout, there are surely more projects on the way!</p>
                    <img src={window.splash5} alt="ph-img" />
                    <h2 className="journey-question">Wanna give it a try?</h2>
                    { props.loggedIn ? (
                                <Link className="open-accord bottom" to="/app">Open Accord</Link>
                        ) : (
                                <Link className="register-link" to="/register">Create an account</Link>
                        ) }
                </div>
            )
    }
}