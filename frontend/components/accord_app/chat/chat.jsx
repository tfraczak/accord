import React, { Component } from "react";
import MessageFormContainer from "./message_form/message_form_container";
import { extractDateTime } from "../../../utils/func_utils";
import { nextChat } from "../../../utils/selectors";
import MessageListItem from "./message_form/message_list_item";

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

    componentWillUnmount() {
        // this.props.history.location.pathname is the next url path
        const nextPath = this.props.history.location.pathname;
        const next = nextChat(nextPath);
        const type = next[0];
        const id = next[1];
        if (type === "Channel") {
            this.props.retrieveChannel(id);
        } // else retrieveConversation(id)
    }

    componentDidUpdate() {
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView();
        }
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
                <div ref={this.bottom} key={`message-${message.id}`} className="message-wrapper">
                    <div className="message-info-wrapper">
                        <img src={window.defaultAvatarUrl} className="chat-avatar" />
                        <h6 className="author">{ chatMembers[message.authorId] ? chatMembers[message.authorId].username : null}</h6>
                        <p className="date-time">{extractDateTime(message.createdAt)}</p>
                    </div>
                    <p className="message" >{ message.body }</p>
                </div>
            );
        });

        // const messageList = this.state.messages.map(message => {
        //     return <MessageListItem ref={this.bottom} key={`msg-${message.id}`} message={message} chatMembers={chatMembers} />
        // })

        return (
            <>
                <div key={chat.id} className="messages-wrapper">{ messageList }</div>
                <div className="msg-form-separator" />
                <MessageFormContainer
                    subscription={ this.subscription }
                    message={ newMessage }
                    key={`mform-${chat.id}`}/>
            </>
        )
    }
}

export default Chat;