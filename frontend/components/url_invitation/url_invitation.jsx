import React from 'react';

class UrlInvitation extends React.Component {
    constructor(props) {
        super(props);
        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
        this.expired = false;
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
            getServerByUrl(urlToken)
                .then(
                    () => retrieveUserServers(currentUserId),
                    err => {
                        if (err.status !== 401) {
                            history.push("/404");
                        } else {
                            if (!this.expired) {
                                this.setState({
                                    join: () => (
                                        <h6 className="redirect">You will be redirected to your profile.</h6>
                                    ),
                                    question: () => (
                                        <h1 className="expired">This invite code is expired!</h1>
                                    ),
                                    x: () => (
                                        <div className="x">
                                            <h6>+</h6>
                                        </div>
                                    )
                                })
                            }
                            this.expired = true;
                            setTimeout(() => {
                                history.push("/app");
                            }, 3000);
                        }
                    }
                );
        } else {
            history.push("/404");
        }

    }

    handleYes(e) {
        e.preventDefault();
        const redirectTime = 3000;

        const {
            serverIds,
            invitedServer,
            currentUserId,
            history,
        } = this.props;

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
                history.push("./app");
            },redirectTime);
            return;
        } else if (this.props.errors[0] === "Invite code is expired.") {
            this.setState({
                join: () => (
                    <div className="join-wrapper">
                        <h1 className="code-expired">This invite code expired!</h1>
                        <p>You will be redirected to your profile.</p>
                    </div>
                ),
                question: () => <div className="separator"></div>,
            });
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
                userId: currentUserId,
                joinableId: invitedServer.id,
                joinableType: "Server",
            }
            this.props.joinServer(membership, currentUserId)
                .then(
                    res => {
                        setTimeout(() => history.push("/app"), redirectTime);
                        this.setState({
                            join: () => (
                                <div className="join-wrapper">
                                    <h1 className="joined">Joined!</h1>
                                    <p>You will be redirected to your profile.</p>
                                </div>
                            ),
                            question: () => <div className="separator"></div>,
                        });
                    }, err => {
                        if (err.status === 409) {
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
                                history.push("./app");
                            },redirectTime);
                        } else {
                            this.setState({
                                join: () => (
                                    <div className="join-wrapper">
                                        <h1 className="already-joined">Sorry, something went wrong!</h1>
                                        <p>You will be redirected to your profile.</p>
                                    </div>
                                ),
                                question: () => <div className="separator"></div>,
                            });
                            setTimeout(() => {
                                history.push("./app");
                            },redirectTime);
                        }
                    }
                )
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
                { invitedServer.imageUrl ?
                    (
                        <img src={ invitedServer.imageUrl } className="server-icon img" />
                    ) :
                    (
                        <h1 className="server-icon default">
                            { this.props.serverInitials(invitedServer.name) }
                        </h1>
                    )
                }
                <h2 className="server-name">
                    { invitedServer.name }
                </h2>
            </div>
            );
        } else if (this.expired) {
            return ( <h3 className="x">+</h3> )
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
                        { this.state.x ? this.state.x() : this.insertServerInfo() }
                        { this.state.question() }
                    </div>
                </div>
            </>
        )
    }

}

export default UrlInvitation;