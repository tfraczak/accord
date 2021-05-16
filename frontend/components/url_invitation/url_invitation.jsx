import React from 'react';
import { Link } from 'react-router-dom';

class UrlInvitation extends React.Component {
    constructor(props) {
        super(props);
        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
        this.state = {
            join: () => (
                <div className="yes-no-wrapper">
                    <button onClick={this.handleNo.bind(this)} className="cancel-button">Cancel</button>
                    <button onClick={this.handleYes.bind(this)} className="join-button">Join</button>
                </div>
            ),
            question: () => (
                <h1 className="ui-question">Would you like to join?</h1>
            )
        };
        this.insertServerInfo = this.insertServerInfo.bind(this);
    }

    componentDidMount() {
        const {
            retrieveUserServers,
            currentUserId,
            history,
            getServerByUrl,
            urlToken,
            validUrlToken,
        } = this.props;
        
        if (validUrlToken(this.props.urlToken)) {
            getServerByUrl(urlToken).then(() => (
                retrieveUserServers(currentUserId)
            ), () => (
                history.push("/404")
            ));
        } else {
            history.push("/404");
        }

    }

    handleYes(e) {
        e.preventDefault();
        const redirectTime = 10000;
        const serverIds = this.props.serverIds;
        const invitedServer = this.props.invitedServer;
        if (serverIds.includes(invitedServer.id.toString())) {
            this.setState({
                join: () => (
                    <div className="join-wrapper">
                        <h1 className="already-joined">You're already a member!</h1>
                        <p>You will be redirected to your profile.</p>
                    </div>
                ),
                question: () => <div className="separator"></div>,
            });
            setTimeout(() => {
                this.props.history.push("./app");
            },redirectTime);
            return;
        } else {
            this.setState({
                join: () => (
                    <div className="join-wrapper">
                        <img className="join-loading" src={ window.loadingImg } alt="join-load" />
                    </div>
                ),
                question: () => <div className="separator"></div>,
            });
            let membership = {
                userId: this.props.currentUserId,
                joinableId: invitedServer.id,
                joinableType: "Server",
            }
            this.props.joinServer(membership).then(() => {
                setTimeout(() => this.props.history.push("/app"), redirectTime);
                this.setState({
                    join: () => (
                        <div className="join-wrapper">
                            <h1 className="joined">Joined!</h1>
                            <p>You will be redirected to your profile.</p>
                        </div>
                    ),
                    question: () => <div className="separator"></div>,
                });
            });
        }
    }

    handleNo(e) {
        e.preventDefault();
        this.props.history.push("/app");
    }

    insertServerInfo() {
        if (this.props.invitedServer) {
            const { invitedServer } = this.props;
            return (
            <div className="ui-server-info-wrapper">
                <h1 className="default-server-icon">
                    { this.props.serverInitials(invitedServer.name) }
                </h1>
                <h2 className="server-name">
                    { invitedServer.name }
                </h2>
            </div>
            );
        }
    }

    render() {
        const inlineBgImg = {backgroundImage: `url(${window.backgroundImg})`};
        return (
            <>
                <div className="bg-container" style={inlineBgImg}></div>
                <div className="url-invite-wrapper">
                    <div className="url-invite-content-box">
                        { this.state.join() }
                        { this.insertServerInfo() }
                        { this.state.question() }
                    </div>
                </div>
            </>
        )
    }

}

export default UrlInvitation;