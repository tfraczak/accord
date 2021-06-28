import React, { Component } from 'react';
import { convertToSnakeCase } from '../../../../utils/func_utils';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = { body: props.message.body };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
        const { action, setState } = this.props;
        const sub = this.props.subscription;
        if (this.state.body) {
            let message = this.props.message;
            message.body = this.state.body;
            switch(action) {
                case "create":
                    sub.speak(({
                        message: convertToSnakeCase(message)
                    }), sub);
                    this.setState({ body: "" });
                    break;
                case "update":
                    sub.update(({
                        message: convertToSnakeCase(message)
                    }), sub);
                    setState({
                        updateMsgId: null,
                    });
                    break;
            }
            
        }
    }

    handleCancel() {
        const { setState } = this.props;
        setState({
            updateMsgId: null,
        });
    }

    render() {
        const { action } = this.props;
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
                { action === "update" ? (
                    <div className="um-options">
                        escape to <button type="button" onClick={ this.handleCancel } className="um-btn cancel">cancel</button>
                        &nbsp;• enter to <button type="submit" className="um-btn save">save</button>
                    </div>
                ) : null }
                </form>
            </>
        )
    }
}

export default MessageForm;