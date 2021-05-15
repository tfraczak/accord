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
                    <button onClick={this.handleYes.bind(this)} className="yes-button">Join</button>
                    <button onClick={this.handleNo.bind(this)} className="no-button">Cancel</button>
                </div>
            )
        };
        this.insertServerIcon = this.insertServerIcon.bind(this);
    }

    componentDidMount() {
        const {
            retrieveUserServers,
            currentUserId,
            history,
            getServerByUrl,
            urlToken,
            invitedServer,
            validUrlToken,
        } = this.props;
        if (validUrlToken(this.props.urlToken)) {
            getServerByUrl(urlToken);
            retrieveUserServers(currentUserId);
        } else {
            history.push("/404");
        }

    }

    handleYes(e) {
        e.preventDefault();
        const serverIds = this.props.serverIds;
        const invitedServer = this.props.invitedServer;
        if (serverIds.includes(invitedServer.id.toString())) {
            this.setState({
                join: () => (
                    <div className="aj-wrapper">
                        <h1 className="already-joined">You're already a member!</h1>
                        <Link className="to-app" to="/app">Open Accord</Link>
                    </div>
                )
            });
            return;
        } else {
            let membership = {
                userId: this.props.currentUserId,
                joinableId: invitedServer.id,
                joinableType: "Server",
            }
            this.props.joinServer(membership).then(() => this.props.history.push("/app"));
        }
    }

    handleNo(e) {
        e.preventDefault();
        this.props.history.push("/app");
    }

    insertServerIcon() {
        if (this.props.invitedServer) {
            const { invitedServer } = this.props;
            return (
                <h1 className="default-server-icon">
                    {this.props.serverInitials(invitedServer.name).slice(0,5)}
                </h1>
            );
        }
    }

    render() {
        return (
            <div className="url-invite-wrapper">
                <div className="url-invite-content-box">
                    { this.insertServerIcon() }
                    { this.state.join() }
                </div>
            </div>
        )
    }

}

export default UrlInvitation;