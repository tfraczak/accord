import React, { Component } from "react";
import MessageForm from "./message_form/message_form";
import MessageListItem from "./message_form/message_list_item";
import { extractDateTime } from "../../../utils/func_utils";
import { nextChat } from "../../../utils/selectors";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            messages: props.messages || [],
            updateMsgId: null,
        };
        this.bottom = React.createRef();
        this.setState = this.setState.bind(this);
        this.subscription = props.chat ? props.createChatSub(this) : undefined;
    }

    componentDidMount() {
        if (!this.props.chat) {
            this.props.history.push("/channels/@me");
        }
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView();
        }
        
    }

    componentWillUnmount() {
        // this.props.history.location.pathname is the next url path
        const {
            history,
            retrieveChannel,
            retrieveConversation,
            channels,
            conversations,
            chat
        } = this.props;
        if (chat) {
            this.subscription.unsubscribe();
            const nextPath = history.location.pathname;
            if (!(nextPath === "/")) {
                const next = nextChat(nextPath);
                const type = next[0];
                const id = next[1];
                if (type === "Channel" && id && channels[id]) {
                    retrieveChannel(id);
                } else if (type === "Conversation" && id && conversations[id]) {
                    retrieveConversation(id);
                } else if (id) {
                    history.push("/channels/@me");
                }
            }
            
        }
        
    }

    componentDidUpdate() {
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView();
        }
    }

    

    render() {
        if (!this.props.chat) {
            this.props.history.push("/channels/@me");
            return null;
        }
        const {
            currentUserId,
            chat,
            type,
            chatMembers,
            placeholder
        } = this.props;
        

        const newMessage = {
            authorId: currentUserId,
            messageableType: type,
            messageableId: chat.id,
            body: "",
        }

        
        const messageList = this.state.messages.map(message => {
            return (
                <MessageListItem 
                    key={`message-${message.id}`} 
                    chatMembers={ chatMembers } 
                    message={ message } 
                    type={ type }
                    subscription={ this.subscription }
                />
            );
        });

        return (
            <>
                <div key={chat.id} className="messages-wrapper">
                    { messageList }
                    <div ref={this.bottom} key={"bottom"} className="message-wrapper bottom"></div>
                </div>
                <div className="msg-form-separator" />
                <MessageForm
                    key={ `mform-${chat.id}-${type}` }
                    action={ "create" }
                    subscription={ this.subscription }
                    message={ newMessage }
                    placeholder={ placeholder }
                />
            </>
        )
    }
}

export default Chat;