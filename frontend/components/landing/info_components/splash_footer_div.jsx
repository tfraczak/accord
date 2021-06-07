import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
    const { divType } = props;

    const scrollToTop = () => {
        window.scrollTo(0,0);
    }

    switch (divType) {
        case "social":
            return (
                <div className="social-wrapper">
                    <Link to="/" onClick={scrollToTop()}><img src={window.logoUrl} alt="footer-logo" className="footer-logo" /></Link>
                    <div className="social-links">
                        <a 
                            href="https://www.linkedin.com/in/tfraczak/"
                            target="_blank"> 
                            <img className="linkedin-logo" src={window.linkedinLogo} alt="linkedin" />
                        </a>
                        <a 
                            href="https://www.github.com/tfraczak"
                            target="_blank">
                            <img className="github-logo" src={window.githubLogo} alt="github" />
                        </a>
                    </div>
                    <p>Accord is a clone of Discord.</p>
                    <p className="demo-only">This site is intended for demonstration only.</p>
                    <hr />
                    <p>About the engineer:</p>
                    <p>Timothy Fraczak is a fullstack software engineer based in Queens, NY.</p>
                    <p>B.E. Chemical Engineering</p>
                    <p style={{marginTop: 3 + "px"}}>&emsp;Stony Brook University, 2008</p>
                    <p>M.E. Chemical Engineering</p>
                    <p style={{marginTop: 3 + "px"}}>&emsp;City College, 2015</p>
                    <p>Graduate of <a href="https://www.appacademy.io/" target="_blank">App Academy</a></p>
                </div>
            )
        case "skills":
            return (
                <div className="skills-wrapper">
                    <h1 className="skills-title">Skills</h1>
                    <ul className="skills-list">
                        <li>Ruby</li>
                        <li>Ruby on Rails</li>
                        <li>PostgreSQL</li>
                        <li>HTML</li>
                        <li>CSS/SCSS</li>
                        <li>JavaScript</li>
                        <li>React/Redux</li>
                    </ul>
                </div>
            )
        case "hobbies":
            return (
                <div className="hobbies-wrapper">
                    <h1 className="hobbies-title">Hobbies</h1>
                    <ul className="hobbies-list">
                        <li>Cooking</li>
                        <li>Grilling/Smoking</li>
                        <li><a href="https://www.pepplish.com" target="_blank">Hot Sauce</a></li>
                        <li>Brewing Mead</li>
                        <li>Woodworking</li>
                        <li>Video Games</li>
                        <li>Gardening</li>
                        <li>Baseball/Softball</li>
                        <li>Fishing</li>
                    </ul>
                </div>
            )
        case "projects":
            return (
                <div className="projects-wrapper">
                    <h1 className="projects-title">Projects</h1>
                    <ul className="projects-list">
                        <li><Link to="/">Accord</Link></li>
                        <li><a href="https://postcard-triplog.herokuapp.com/#/" target="_blank">Postcard</a></li>
                        <li><a href="https://tfraczak.github.io/dungeon_crawler/" target="_blank">Dungeon Crawler</a></li>
                    </ul>
                </div>
            )
        case "contact":
            return (
                <div className="contact-wrapper">
                    <h1 className="contact-title">Contact</h1>
                    <ul className="contact-list">
                        <li>Timothy Fraczak</li>
                        <li>347 770 4444</li>
                        <li><a href="mailto:tfraczak@gmail.com?subject=Hey! I saw your Accord app on Heroku.">tfraczak@gmail.com</a></li>
                    </ul>
                </div>
            )
        default:
            return null;
    }
}