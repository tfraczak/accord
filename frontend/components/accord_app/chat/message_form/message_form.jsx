import React, { Component } from 'react';
import { convertToSnakeCase } from '../../../../utils/func_utils';

class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = { body: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setFocusRef = this.setFocusRef.bind(this);
    }

    componentDidMount() {
        this.focusRef.focus();
    }

    setFocusRef(node) {
        this.focusRef = node;
    }

    update(field) {
        return e => {
            this.setState({
                [field]: e.currentTarget.value
            });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const sub = this.props.subscription;
        if (this.state.body) {
            let message = this.props.message;
            message.body = this.state.body;
            sub.speak(({
                message: convertToSnakeCase(message)
            }), sub);
            this.setState({ body: "" });
        }
    }

    render() {

        return (
            <>
                <form 
                    className="message-form"
                    onSubmit={ this.handleSubmit }>
                        <input
                            ref={ this.setFocusRef }
                            type="text"
                            className="message-input"
                            placeholder={this.props.placeholder}
                            value={ this.state.body}
                            onChange={ this.update("body") }/>
                </form>
            </>
        )
    }
}

export default MessageForm;