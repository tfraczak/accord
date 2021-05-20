import React, { Component } from "react";
import MessageFormContainer from "./message_form/message_form_container";
import { extractDateTime } from "../../../utils/func_utils";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: props.messages || [] };
        this.bottom = React.createRef();
        this.subscription = App.cable.subscriptions.create(
            {
                channel: `ChatChannel`,
                type: `${this.props.type}`,
                chatId: this.props.chat.id,

            },
            {
                received: data => {
                    if (data.messages) {
                        
                        this.state.messages = this.state.messages.concat(data.messages);

                    } else {
                        this.props.receiveMessage(data.message);
                        this.setState.call(this, ({
                            messages: this.state.messages.concat(data.message)
                        }));
                    }
                    
                },
                speak: data => {
                    return this.subscription.perform("speak", data);
                },
                unsubscribed: () => {
                    return this.subscription.perform("unsubscribed");
                },
                load: () => {
                    return this.subscription.perform("load");
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
            chatMembers,
        } = this.props;
        

        const newMessage = {
            authorId: currentUserId,
            messageableType: type,
            messageableId: chat.id,
            body: "",
        }

        

        const messageList = this.state.messages.map(message => {
            return (
                <div key={`message-${message.id}`} className="message-wrapper">
                    <div className="message-info-wrapper">
                        <img src={window.defaultAvatarUrl} className="chat-avatar" />
                        <h6 className="author">{ chatMembers[message.authorId].username }</h6>
                        <p className="date-time">{extractDateTime(message.createdAt)}</p>
                    </div>
                    <p className="message">{ message.body }</p>
                </div>
            );
        });
        return (
            <>
                <div key={chat.id} className="messages-wrapper">{ messageList }</div>
                <div ref={this.bottom} />
                <MessageFormContainer
                    subscription={ this.subscription }
                    message={ newMessage }/>
            </>
        )
    }
}

export default Chat;