import React from 'react';
import { extractDateTime } from "../../../../utils/func_utils";
import MessageForm from './message_form';


class MessageListItem extends React.Component {
    constructor(props) {
        super(props);
        this.setToolbarRef = this.setToolbarRef.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    setToolbarRef(node) {
        this.toolbarRef = node;
    }

    insertMessageBody() {
        const { message } = this.props;
        const createdAt = new Date(message.createdAt).getTime();
        const updatedAt = new Date(message.updatedAt).getTime();
        const isEdited = (updatedAt - createdAt) > 0;
        return (
            <div className="message-body-wrapper">
                <p className="message" >{ message.body }</p>
                { isEdited ? (<h6 className="edited">(edited)</h6>) : null }
            </div>
        ); 
    }

    insertUpdateForm() {
        return (
            <div className="um-wrapper">
                <MessageForm 
                    key={ `mform-update` }
                    action={ "update" }
                    subscription={ this.props.subscription }
                    message={ this.props.message }
                    placeholder={ "" }
                    setState={ this.props.setState }
                />
            </div>
        )
    }

    insertChannelMember() {
        const { message, chatMembers } = this.props;
        return (
            <h6 className={ `author${chatMembers[message.authorId] ? "" : " not-a-member"}` }>
                { 
                    chatMembers[message.authorId] ? 
                        (
                            chatMembers[message.authorId].localUsername ? 
                                chatMembers[message.authorId].localUsername :
                                chatMembers[message.authorId].username
                        ) :
                        (
                            message.author ?
                                message.author.localUsername :
                                "(Deleted User)"
                        )
                }
            </h6>
        );
    }

    insertConvoMember() {
        const { message, chatMembers } = this.props;
        return (
            <h6 className={ `author${chatMembers[message.authorId] ? "" : " not-a-member"}` }>
                { 
                    chatMembers[message.authorId] ? 
                        (
                            chatMembers[message.authorId].username
                        ) :
                        (
                            message.author ?
                                message.author.username :
                                "(Deleted User)"
                        )
                }
            </h6>
        );
    }

    onMouseEnter() {
        this.toolbarRef?.classList.remove("hidden");
    }

    onMouseLeave() {
        this.toolbarRef?.classList.add("hidden");
    }

    render() {
        const {
            message,
            type,
            handleEdit,
            handleDelete,
            updateMsgId,
            isAuthor
        } = this.props;
        return (
            <div onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave } key={`message-${message.id}`} className="message-wrapper">
                <div className="message-info-wrapper">
                    <img src={ message.author.avatarUrl ? message.author.avatarUrl : window.defaultAvatarUrl} className="chat-avatar" />
                    { type === "Channel" ? this.insertChannelMember() : this.insertConvoMember() }
                    <p className="date-time">{extractDateTime(message.createdAt)}</p>
                </div>
                { updateMsgId === message.id ? this.insertUpdateForm() : this.insertMessageBody() }
                { isAuthor ? (
                    <ul ref={ this.setToolbarRef } className="message-toolbar hidden">
                        <li>
                            <button onClick={ handleEdit } type="button" className="fas fa-pencil-alt"></button>
                        </li>
                        <li>
                            <button onClick={ handleDelete } type="button" className="fas fa-trash-alt"></button>
                        </li>
                    </ul>
                ) : null }
                
            </div>
        );
    }
}

export default MessageListItem;