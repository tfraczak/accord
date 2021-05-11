import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
    const { divType } = props;

    switch (divType) {
        case "social":
            return (
                <div className="social-wrapper">
                    <Link to="#top"><img src={window.logoUrl} alt="footer-logo" className="footer-logo" /></Link>
                    <div className="social-links">
                        <Link to="https://www.linkedin.com/in/timothy-fraczak-e-i-t-1393a183/">
                            <img src={window.linkedinLogo} alt="linkedin" />
                        </Link>
                        <Link to="https://www.github.com/tfraczak">
                            <img src={window.githubLogo} alt="github" />
                        </Link>
                    </div>
                </div>
            )
        case "skills":
            return (
                <div className="skills-wrapper">
                    <div className="">

                    </div>
                </div>
            )
        case "other-things":
            return (
                <div className="other-things-wrapper">
                    <div className="">

                    </div>
                </div>
            )
        case "other-projects":
            return (
                <div className="other-projects-wrapper">
                    <div className="">

                    </div>
                </div>
            )
        case "contact":
            return (
                <div className="contact-wrapper">
                    <div className="">

                    </div>
                </div>
            )
        default:
            return null;
    }
}