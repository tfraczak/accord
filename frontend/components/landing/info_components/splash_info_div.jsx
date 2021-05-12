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
                        <Link className="login-link" to="/login"><i className="fas fa-sign-in-alt"></i>Login</Link>
                        <Link className="register-link" to="/register">Create an account</Link>
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="div-2">
                    <img src={window.placeholderImg} alt="ph-img" />
                    <div className="title-desc">
                        <h1 className="title">An invite-only place with plenty of room to talk</h1>
                        <p className="desc">Accord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
                    </div>
                </div>
            )
        case 3:
            return (
                <div className="div-3">
                    <div className="title-desc">
                        <h1 className="title">Where hanging out is easy</h1>
                        <p className="desc">Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</p>
                    </div>
                    <img src={window.placeholderImg} alt="ph-img" />
                </div>
            )
        case 4:
            return (
                <div className="div-4">
                    <img src={window.placeholderImg} alt="ph-img" />
                    <div className="title-desc">
                        <h1 className="title">From a few to a fandom</h1>
                        <p className="desc">Get a community of any size running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</p>
                    </div>
                </div>
            )
        case 5:
            return (
                <div className="div-5">
                    <h1 className="title">Reliable tech for staying close</h1>
                    <p className="desc">Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</p>
                    <img src={window.placeholderImg} alt="ph-img" />
                    <h2 className="journey-question">Ready to start your journey?</h2>
                    <Link className="register-link" to="/register">Create an account</Link>
                </div>
            )
    }
}