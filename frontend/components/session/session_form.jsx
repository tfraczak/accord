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
                            className="session-form username-label" >
                            username
                            { insertError("username") }
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

        const insertSubTitle = () => {
            if (formTitle === "Welcome back!") {
                return <>{formSubTitle()}</>;
            }
            return null;
        };

        const insertAgreement = () => {
            if (formTitle === "Create an account") {
                return (
                    <p className="session-form footer-tos">
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

                const errorClassName = `session-form ${field}-error`;

                return (
                    <p className={errorClassName}>- <em>{errorMessage}</em></p>
                )
            }

            return null;

        };

        ////////////// render //////////////

        return (
            <div className="session-form wrapper">
                <div>
                    <h2 className="session-form title">{ formTitle }</h2>
                    { insertSubTitle() }
                    <form
                        className="session-form form"
                        onSubmit={ this.handleSubmit }>
                        
                        <label htmlFor="email" className="session-form email-label" >
                            email
                            { insertError("email") }
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={ this.state.email }
                            onChange={ this.handleChange('email') }
                            className="sesion-form email-input" />
                        { insertUsername() }
                        <label htmlFor="password" className="session-form password-label" >
                            password
                            { insertError("password") }
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={ this.state.password }
                            onChange={ this.handleChange('password') }
                            className="sesion-form password-input" />
                        <div className="session-form footer">
                            <button className="session-form button">{ formButtonText }</button>
                            { formFooterLink() }
                        </div>
                        { insertAgreement() }
                    </form>
                </div>
            </div>
        )
            
    }
}


export default SessionForm;