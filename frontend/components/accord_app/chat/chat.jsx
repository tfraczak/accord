import React, { Component } from "react";
import MessageFormContainer from "./message_form/message_form_container";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.bottom = React.createRef();
        this.subscription = App.cable.subscriptions.create(
            {
                channel: `ChatChannel`,
                type: `${this.props.type}`,
                chatId: this.props.chat.id,

            },
            {
                received: data => {
                    this.setState.call(this, ({
                        messages: this.state.messages.concat(data.message)
                    }));
                },
                speak: data => {
                    return this.subscription.perform("speak", data);
                }
            }
        );

    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        this.bottom.current.scrollIntoView();
    }

    render() {
        const {
            currentUserId,
            chat,
            type,
        } = this.props;

        const newMessage = {
            authorId: currentUserId,
            messageableType: type,
            messageableId: chat.id,
            body: "",
        }

        const messageList = this.state.messages.map(message => {
            return (
                <li key={`message-${message.id}`} className="message">
                    { message.body }
                </li>
            );
        });
        return (
            <>
                <div className="messages-wrapper">{ messageList }</div>
                <div ref={this.bottom} />
                <MessageFormContainer
                    subscription={this.subscription}
                    message={ newMessage }/>
            </>
        )
    }
}

export default Chat;