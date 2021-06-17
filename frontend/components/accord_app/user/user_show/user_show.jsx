import React from 'react';
import { serverInitials } from '../../../../utils/func_utils';

class UserShow extends React.Component {
  constructor(props) {
      super(props);
      this.handleSendMessage = this.handleSendMessage.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.clickClose = this.clickClose.bind(this);
  }

  componentDidMount() {
    const {
      createdConvo,
      closeModal,
      history,
      removeCreatedConvo,
    } = this.props;

    if (createdConvo) {
      closeModal();
      history.push(`/channels/@me/${createdConvo.id}`);
      removeCreatedConvo();
    }
  }

  componentWillUnmount() {
    this.props.removeCreatedConvo();
  }

  handleSendMessage() {
    const {
      createConversation,
      user,
      currentUser
    } = this.props

    const convo = {
      initiatorId: currentUser.id,
      receiverId: user.id,
      name: "",
    };

    createConversation(convo);

  }

  handleSubmit(e) {

  }

  insertMutualServers() {
    const { mutualServers, user } = this.props;
    return (
      <ul className="common-servers">
        { mutualServers.map(server => (
          <li key={`mutual-server-${server.id}`} className="common-server-item">
            <img className="server-image" src={ server.imageUrl ? server.imageUrl : serverInitials(server.name) } />
            <div className="server-info-wrapper">
              <h1 className="server-name" >{ server.name }</h1>
              <h3 className="local-username" >{ `#${user.username}` }</h3>
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
          <div className="user-show-wrapper">
            
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
              <button onClick={ this.handleSendMessage } className="send-message-btn">
                Send Message
              </button>
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