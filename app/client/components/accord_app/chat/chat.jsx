import React, { Component } from 'react';
import MessageForm from './message_form/message_form';
import MessageListItem from './message_form/message_list_item';
import { nextChat } from '@selectors';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages || [],
      updateMsgId: null,
    };
    this.bottom = React.createRef();
    this.setState = this.setState.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToolbarClose = this.handleToolbarClose.bind(this);
    this.subscription = props.chat ? props.createChatSub(this) : undefined;
  }

  handleEdit(message) {
    return () => {
      this.setState({ updateMsgId: message.id });
    };
  }

  handleDelete(message) {
    return () => {
      const sub = this.subscription;
      sub.delete({ message });
    };
  }

  componentDidMount() {
    if (!this.props.chat) {
      this.props.history.push('/channels/@me');
    }
    if (this.bottom.current) {
      this.bottom.current.scrollIntoView();
    }
    document.addEventListener('keydown', this.handleToolbarClose);
  }

  handleToolbarClose(e) {
    if (e.key === 'Escape' && this.state.updateMsgId) {
      this.setState({ updateMsgId: null });
    }
  }

  componentWillUnmount() {
    // this.props.history.location.pathname is the next url path
    document.removeEventListener('keydown', this.handleToolbarClose);
    const {
      history,
      retrieveChannel,
      retrieveConversation,
      channels,
      conversations,
      chat,
    } = this.props;
    if (chat) {
      this.subscription.unsubscribe();
      const nextPath = history.location.pathname;
      if (!(nextPath === '/')) {
        const next = nextChat(nextPath);
        const type = next[0];
        const id = next[1];
        if (type === 'Channel' && id && channels[id]) {
          retrieveChannel(id);
        } else if (type === 'Conversation' && id && conversations[id]) {
          retrieveConversation(id);
        } else if (id) {
          history.push('/channels/@me');
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
      this.props.history.push('/channels/@me');
      return null;
    }
    const {
      currentUserId,
      chat,
      type,
      chatMembers,
      placeholder,
    } = this.props;


    const newMessage = {
      authorId: currentUserId,
      messageableType: type,
      messageableId: chat.id,
      body: '',
    };


    const messageList = this.state.messages.map((message) => {
      return (
        <MessageListItem
          key={`message-${message.id}${message.updatedAt}`}
          chatMembers={ chatMembers }
          message={ message }
          type={ type }
          subscription={ this.subscription }
          handleEdit={ this.handleEdit(message) }
          setState={ this.setState }
          updateMsgId={ this.state.updateMsgId }
          isAuthor={ currentUserId === message.authorId }
          handleDelete={ this.handleDelete(message) }
        />
      );
    });

    return (
      <>
        <div key={chat.id} className="messages-wrapper">
          { messageList }
          <div ref={this.bottom} key={'bottom'} className="message-wrapper bottom"></div>
        </div>
        <div className="msg-form-separator" />
        <MessageForm
          key={ `mform-${chat.id}-${type}` }
          action={ 'create' }
          subscription={ this.subscription }
          message={ newMessage }
          placeholder={ placeholder }
        />
      </>
    );
  }
}

export default Chat;