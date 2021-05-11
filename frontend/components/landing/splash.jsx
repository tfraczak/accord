import React from 'react';
import { Link } from 'react-router-dom';
import SplashInfoDiv from "./info_components/splash_info_div";

export default (props) => {
    const insertSessionButton = () => {
        if (props.currentUser) {
            return <button className="logout-button" onClick={props.logout}>Logout</button>
        } else {
            return <Link to="/login" className="to-login">Login</Link>
        }
    }

    return (
        <div className="splash-wrapper">
            <img className="bg-image" src={window.backgroundImg} alt="bg-img" />
            <header className="header-wrapper">
                <div className="header-elements">
                    <a name="top">
                        <img id="splash-logo" className="horizontal-logo" src={window.logoUrl} />
                    </a>
                    <nav>
                        <p>Download</p>
                        <p>Why Accord?</p>
                        <p>Nitro</p>
                        <p>Safety</p>
                        <p>Support</p>
                    </nav>
                    { insertSessionButton() }
                </div>
            </header>
            <div className="splash-box">
                <div className="splash-info-wrapper">
                    <SplashInfoDiv divNum={1} />
                    <SplashInfoDiv divNum={2} />
                    <SplashInfoDiv divNum={3} />
                    <SplashInfoDiv divNum={4} />
                    <SplashInfoDiv divNum={5} />
                </div>
            </div>
            <div className="splash-footer-wrapper">
                <div className="footer-grid">
                    
                </div>
            </div>
        </div>
    )
}