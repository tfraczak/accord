import React from 'react';
import { Link } from 'react-router-dom';
import SplashInfoDiv from "./info_components/splash_info_div";
import SplashFooterDiv from "./info_components/splash_footer_div";

export default (props) => {
    const insertSessionButton = () => {
        if (props.currentUser) {
            return <button className="logout-button" onClick={props.logout}>Logout</button>
        } else {
            return <Link to="/login" className="to-login">Login</Link>
        }
    }

    const inlineBgImg = {backgroundImage: `url(${window.backgroundImg})`};
    
    // <img className="bg-image" src={window.backgroundImg} alt="bg-img" />

    return (
        <div className="splash-wrapper">
            <a name="#top"></a>
            <div className="bg-container" style={inlineBgImg}></div>
            <header className="header-wrapper">
                <div className="header-elements">
                    <img id="splash-logo" className="horizontal-logo" src={window.logoUrl} />
                    <nav className="splash-nav">
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
                    <SplashFooterDiv divType="social" />
                    <SplashFooterDiv divType="skills" />
                    <SplashFooterDiv divType="hobbies" />
                    <SplashFooterDiv divType="projects" />
                    <SplashFooterDiv divType="contact" />
                </div>
            </div>
        </div>
    )
}