import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
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
                case 2:
                    user = {
                        email: "tim@gmail.com",
                        password: "password",
                    };
                default:
                    user = {
                        email: "teddy@gmail.com",
                        password: "password",
                    };
            }
            this.props.processForm(user);
        }
    }

    render() {

        ////////////// form specific variables //////////////

        const { errors } = this.props;
        const { 
            formTitle,
            formSubTitle,
            formButtonText,
            formFooterLink,
            formFooterTOS,
            formFooterPrivacy,
        } = this.props;

        ////////////// form specific inserts //////////////

        const insertUsername = () => {
            if (formTitle === "Create an account") {
                return (
                    <>
                        <label 
                            htmlFor="username"
                            className="username-label" >
                            username
                            { insertError("Username") }
                        </label>
                        <input
                            id="username"
                            type="text"
                            onChange={this.handleChange('username')}
                            value={this.state.username}
                            className="sesion-form username-input" />
                    </>
                )
            }
            return null;
        };

        const insertDemoLogin = () => {
            if (formTitle === "Welcome back!") {
                return (
                    <div className="demo-login">
                        <h2>Guest Demo Login</h2>
                        <button onClick={this.guestDemoLogin(1)}>Guest 1</button>
                        <button onClick={this.guestDemoLogin(2)}>Guest 2</button>
                    </div>
                )
            }
        }

        const insertSubTitle = () => {
            if (formTitle === "Welcome back!") {
                return <>{formSubTitle()}</>;
            }
            return null;
        };

        const insertAgreement = () => {
            if (formTitle === "Create an account") {
                return (
                    <p className="footer-tos">
                        By registering, you agree to Accord's {formFooterTOS()} and {formFooterPrivacy()}.
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
                    }
                });

                switch(errorMessage) {
                    case "Password is too short (minimum is 6 characters)":
                        errorMessage = "Must be 6 or more in length";
                        break;
                    case "Email has already been taken":
                        errorMessage = "Email is already registered";
                        break;
                    default:
                        break;
                }

                const errorClassName = `${field}-error`;
                if (errorMessage) return <p className={errorClassName}>- <em>{errorMessage}</em></p>;
            }

            return null;

        };

        ////////////// render //////////////

        return (
            <div className="session-form-wrapper">
                <div className="form-box">
                    <div className="form-wrapper">
                        
                        <h2 className="title">{ formTitle }</h2>
                        { insertSubTitle() }
                        
                        <form
                            className="form"
                            onSubmit={ this.handleSubmit }>

                            <label htmlFor="email" className="email-label" >
                                email
                                { insertError("Email") }
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={ this.state.email }
                                onChange={ this.handleChange('email') }
                                className="sesion-form email-input" />
                            { insertUsername() }
                            <label htmlFor="password" className="password-label" >
                                password
                                { insertError("Password") }
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={ this.state.password }
                                onChange={ this.handleChange('password') }
                                className="sesion-form password-input" />
                            <div className="footer">
                                <button className="button">{ formButtonText }</button>
                                { formFooterLink() }
                            </div>
                            { insertAgreement() }
                        </form>
                    </div>
                    { insertDemoLogin() }
                </div>
            </div>
        )
            
    }
}


export default SessionForm;