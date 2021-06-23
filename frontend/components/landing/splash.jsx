import React from 'react';
import { Link } from 'react-router-dom';
import SplashInfoDiv from "./info_components/splash_info_div";
import SplashFooterDiv from "./info_components/splash_footer_div";
import CanvasBackground from '../canvas_background/canvas_background';


// class Splash extends React.Component {
//     constructor(props){
//         super(props);
//     }



// }

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
            
            <a name="top"></a>
            <div className="bg-container">
                <CanvasBackground key="canvas-background"
                    numStars={ 400 }
                    numBackFlakes={ 200 }
                    numFrontFlakes={ 100 }
                    bgUrl={ window.backgroundImg }
                />
            </div>
            <header className="header-wrapper">
                <div className="header-elements">
                    <img id="splash-logo" className="horizontal-logo" src={window.logoUrl} />
                    <nav className="splash-nav">
                        <a href="https://www.linkedin.com/in/tfraczak/" target="_blank">LinkedIn</a>
                        <a href="https://github.com/tfraczak" target="_blank">GitHub</a>
                        <a href="https://angel.co/tfraczak" target="_blank">AngelList</a>
                        <a href="https://www.pepplish.com/" target="_blank">Hot Sauce</a>
                    </nav>
                    { insertSessionButton() }
                </div>
            </header>
            <div className="splash-box">
                <div className="splash-info-wrapper">
                    <section className="info-wrapper one"><SplashInfoDiv divNum={1} loggedIn={props.loggedIn} /></section>
                    <section className="info-wrapper two"><SplashInfoDiv divNum={2} loggedIn={props.loggedIn} /></section>
                    <section className="info-wrapper three"><SplashInfoDiv divNum={3} loggedIn={props.loggedIn} /></section>
                    <section className="info-wrapper four"><SplashInfoDiv divNum={4} loggedIn={props.loggedIn} /></section>
                    <section className="info-wrapper five"><SplashInfoDiv divNum={5} loggedIn={props.loggedIn} /></section>
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