import React, { Component } from "react";
import MessageForm from "../message_form/message_form_container";

class ChatChannel extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.bottom = React.createRef();
        this.subscription = App.cable.subscriptions.create(
            {
                channel: `ChatChannel`,
                type: `Channel`,
                chatId: 1,

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
        debugger

    }

    componentDidMount() {
        // App.cable.subscriptions.create(
        //     { channel: `ChatChannel` }, // this needs to be the same backend?
        //     {
        //         received: data => {
        //             this.setState({
        //                 messages: this.state.messages.concat(data.message)
        //             });
        //         },
        //         speak: data => {
        //             return this.perform("speak", data);
        //         }
        //     }
        // );
    }

    componentDidUpdate() {
        this.bottom.current.scrollIntoView();
    }

    render() {
        const messageList = this.state.messages.map(message => {
            return (
                <li key={message.id} className="message">
                    { message.body }
                    <div ref={this.bottom} />
                </li>
            );
        });
        return (
            <>
                <div className="messages-wrapper">{ messageList }</div>
                <MessageForm subscription={this.subscription}/>
            </>
        )
    }
}

export default ChatChannel;