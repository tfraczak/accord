import React from 'react';
import { Link } from 'react-router-dom';
import CanvasBackground from '../canvas_background/canvas_background';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.user;
        this.state['error'] = "";
        this.handleSubmit = this.handleSubmit.bind(this);
        this.guestDemoLogin = this.guestDemoLogin.bind(this);
    }

    componentWillUnmount() {
        this.props.removeErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {};
        switch(this.props.formType) {
            case "register":
                user['email'] = this.state.email;
                user['password'] = this.state.password;
                user['username'] = this.state.username;
                break;
            case "login":
                user['email'] = this.state.email;
                user['password'] = this.state.password;
                break;
        }
        this.props.processForm(user);
    }

    handleChange(field) {
        return e => {
            this.setState({
                [field]: e.currentTarget.value,
            })
        };
    }

    guestDemoLogin(num) {
        return e => {
            e.preventDefault();
            let user;
            switch(num) {
                case 1:
                    user = {
                        email: "teddy@gmail.com",
                        password: "password",
                    };
                    return this.props.processForm(user);
                case 2:
                    user = {
                        email: "tim@gmail.com",
                        password: "password",
                    };
                    return this.props.processForm(user);
                case 3:
                    user = {
                        email: "alex@gmail.com",
                        password: "password",
                    };
                    return this.props.processForm(user);
                default:
                    user = {
                        email: "teddy@gmail.com",
                        password: "password",
                    };
                    return this.props.processForm(user);
            }
        }
    }

    render() {

        ////////////// form specific variables //////////////

        const { errors } = this.props;
        const { 
            formTitle,
            formSubTitle,
            formButtonText,
            formFooterTOS,
            formFooterPrivacy,
            formType,
            removeErrors,
        } = this.props;

        const formBox = `form-box-${this.props.formType}`;

        const inlineBgImg = {backgroundImage: `url(${window.backgroundImg})`};

        ////////////// form specific inserts //////////////

        const insertUsername = () => {
            if (formTitle === "Create an account") {
                return (
                    <div className="username-wrapper">
                        { insertError("Username")[0] }
                        <input
                            id="username"
                            type="text"
                            onChange={this.handleChange('username')}
                            value={this.state.username}
                            className={insertError("Username")[1] ? "sesion-form username-input input-error" : "sesion-form username-input"} />
                    </div>
                )
            }
            return null;
        };

        const insertDemoLogin = () => {
            if (formType === "login") {
                return (
                    <div className="demo-login">
                        <h2>Guest Demo Login</h2>
                        <button onClick={this.guestDemoLogin(1)}>Guest 1</button>
                        <button onClick={this.guestDemoLogin(2)}>Guest 2</button>
                        <button onClick={this.guestDemoLogin(3)}>Guest 3</button>
                    </div>
                )
            }
        }

        const insertSubTitle = () => {
            if (formType === "login") {
                return <>{formSubTitle()}</>;
            }
            return null;
        };

        const insertAgreement = () => {
            if (formType === "register") {
                return (
                    <p className="footer-agreement">
                        By registering, you agree to view my {formFooterTOS()} and {formFooterPrivacy()}.
                    </p>
                )
            }
            return null;
        };

        const insertError = field => {
            
            if (errors.length) {
                let errorMessage;
                errors.forEach(error => {
                    if (error.includes(field)) {
                        errorMessage = error;
                        return;
                    } else if (error === "Login or password is invalid.") {
                        errorMessage = error;
                        return;
                    }
                });
                field = field.toLowerCase()
                switch(errorMessage) {
                    case "Username can't be blank":
                        errorMessage = " - This field is required";
                        break;
                    case "Password is too short (minimum is 6 characters)":
                        errorMessage = " - Must be 6 or more in length";
                        break;
                    case "Email has already been taken":
                        errorMessage = " - Email is already registered";
                        break;
                    case "Login or password is invalid.":
                        errorMessage = " - Login or password is invalid."
                        break;
                    case "Email can't be blank":
                        errorMessage = " - Email can't be blank"
                        break;
                    default:
                        break;
                }

                const errorClassName = `${field} input-label error`;
                if (errorMessage) return [(<h3 className={errorClassName}>{field}<em>{errorMessage}</em></h3>), true];
            }

            return [(<h3 className={`${field} input-label`} >{field}</h3>), false];

        };

        const insertInquiryLink = () => {
            switch (formType) {
                case "login":
                    return (
                        <div className="createAccount-inquiryLink">
                            <p className="createAccount-inquiry">Need an account?</p>
                            <Link
                                className="to-register"
                                to="/register">
                                Register</Link>
                        </div>
                    )
                case "register":
                    return <Link
                                className="to-login"
                                to="/login">
                                Already have an account?</Link>
                default:
                    return null;
            }
        }

        ////////////// render //////////////

        return (
            <>
                <div className="bg-container">
                    <CanvasBackground key="canvas-background"
                        numStars={ 400 }
                        numBackFlakes={ 200 }
                        numFrontFlakes={ 100 }
                        bgUrl={ window.backgroundImg }
                    />
                </div>
                <header className="session-header-wrapper">
                    <Link className="session-to-home" to="/">
                        <img id="splash-logo" className="horizontal-logo" src={window.logoUrl} />
                    </Link>
                </header>
                <div className="session-form-wrapper">
                    <div className={ formBox }>
                        <div className="form-wrapper">
                            
                            <h2 className="title">{ formTitle }</h2>
                            { insertSubTitle() }
                            
                            <form
                                className="form"
                                onSubmit={ this.handleSubmit }>
                                <div className="email-wrapper">
                                    { insertError("Email")[0] }
                                    <input
                                        id="email"
                                        type="email"
                                        value={ this.state.email }
                                        onChange={ this.handleChange('email') }
                                        className={insertError("Email")[1] ? "sesion-form email-input input-error" : "sesion-form email-input"} />
                                </div>
                                { insertUsername() }
                                <div className="password-wrapper">
                                    { insertError("Password")[0] }
                                    <input
                                        id="password"
                                        type="password"
                                        value={ this.state.password }
                                        onChange={ this.handleChange('password') }
                                        className={insertError("Password")[1] ? "sesion-form password-input input-error" : "sesion-form password-input"} />
                                </div>
                                { insertAgreement() }
                                <div className="footer">
                                    <button className="button">{ formButtonText }</button>
                                    { insertInquiryLink() }
                                </div>
                                
                            </form>
                        </div>
                        { insertDemoLogin() }
                    </div>
                </div>
            </>
        )
            
    }
}


export default SessionForm;