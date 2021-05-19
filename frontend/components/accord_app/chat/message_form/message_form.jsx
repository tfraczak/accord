import React, { Component } from 'react';
import { convertToSnakeCase } from '../../../../utils/func_utils';

class MessageForm extends Component {
    constructor(props) {
        
        super(props);
        // message object with empty body
        // props.message = { id, body, mid, mtype, authorid, createdat }
        // this.state = props.message;
        this.state = { body: "" };
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
        if (this.state.body) {
            
            let message = this.props.message;
            message.body = this.state.body;
            this.props.subscription.speak(({
                message: convertToSnakeCase(message)
            }));
            this.setState({ body: "" });
        }
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
                            placeholder={`Message # ${this.props.channel.name}`}
                            value={this.state.body}
                            onChange={this.update("body")}/>
                </form>
            </>
        )
    }
}

export default MessageForm;