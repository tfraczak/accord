import React, { Component } from 'react';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        // message object with empty body
        // props.message = { id, body, mid, mtype, authorid, createdat }
        // this.state = props.message;
        this.state = { body: "" };
        debugger
        this.handleSubmit = this.handleSubmit.bind(this);
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
        debugger
        this.props.subscription.speak(({
            message: this.state.body
        }));
        this.setState({ body: "" });
    }

    render() {

        return (
            <>
                <form 
                    className="message-form"
                    onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            className="message-input"
                            placeholder={`STRING`}
                            value={this.state.body}
                            onChange={this.update("body")}/>
                </form>
            </>
        )
    }
}

export default MessageForm;