import React from 'react';
import { serverInitials } from '../../../../utils/func_utils';

class UserShow extends React.Component {
  constructor(props) {
      super(props);
      this.handleSendMessage = this.handleSendMessage.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.clickClose = this.clickClose.bind(this);
      this.setWrapperRef = this.setWrapperRef.bind(this);
      // this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    this.props.removeCreatedConvo();
  }

  handleSendMessage() {
    const {
      createConversation,
      user,
      currentUser,
      history,
      closeModal
    } = this.props

    const convo = {
      initiatorId: currentUser.id,
      receiverId: user.id,
      name: "",
    };

    createConversation(convo)
      .then(
        res => {
          closeModal();
          history.push(`/channels/@me/${res.payload.conversation.id}`);
          removeCreatedConvo();
        }
      );

  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.props.closeModal();
    }
  }

  insertMutualServers() {
    const {
      mutualServers,
      user,
      localUsernameObj,
    } = this.props;
    return (
      <ul className="common-servers">
        { mutualServers.map(server => (
          <li key={`mutual-server-${server.id}`} className="common-server-item">
            <img className="server-image" src={ server.imageUrl ? server.imageUrl : serverInitials(server.name) } />
            <div className="server-info-wrapper">
              <h1 className="server-name" >{ server.name }</h1>
              <h3 className="local-username" >{ `#${localUsernameObj[server.id] ? localUsernameObj[server.id] : user.username}` }</h3>
            </div>
          </li>
        ))
        }
      </ul>
    );
  }

  clickClose() {
      this.props.closeModal();
  }

  render() {
      const { 
          user,
          currentUser,
          mutualServers,
          createdConvo,
      } = this.props;

      const isCurrentUser = user.id === currentUser.id;

      return (
          <div ref={this.setWrapperRef} className="user-show-wrapper">
            
            <div className="top-wrapper">
              <div className="user-wrapper">
                <img className="user-avatar" src={ user.avatarUrl ? user.avatarUrl : window.defaultAvatarUrl } alt={ `${user.username}-avatar` } />
                <div className="username-wrapper">
                  <h1 className="username" >{ user.username }</h1>
                  <h1 className="username-id" >{ `#${user.usernameId}` }</h1>
                </div>
              </div>
            </div>

            <div className="bottom-wrapper">
              {
                isCurrentUser ? null : 
                (
                  <button onClick={ this.handleSendMessage } className="send-message-btn">
                    Send Message
                  </button>
                )
              }
              <ul className="common-stuff">
                { isCurrentUser ? null :
                  (
                    <>
                      <li key="common-servers" className="common servers active">
                        <h1>Mutual Servers</h1>
                      </li>
                    </>
                  )
                }
              </ul>
              <div className="commons">
              
              { isCurrentUser ? null :
                (
                  <>
                    { this.insertMutualServers() }
                  </>
                )
              }
              </div>
            </div>

          </div>
      );
  }
}

export default UserShow;