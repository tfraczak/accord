import React from 'react';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.loadMsg = props.loadingMsg;
    }

    componentDidMount() {
        if (!Object.keys(this.props.sessionSub).length) {
            const sub = this.props.createSessionSub(this.props.currentUserId)
            this.props.receiveSessionSub(sub);
        }
        this.props.retrieveUserLoadData(this.props.currentUserId)
            .then(
                () => {
                    if (this.props.history.location.pathname !== "/channels/@me") {
                        setTimeout(() => this.props.history.push("/channels/@me"),2000);
                    }
                },
                () => this.props.history.push("/")
            );
    }

    render() {
        return (
            <div className="loading-wrapper">
                <img src={ window.loadingImg } alt="loading" />
                <h1>{ this.loadMsg }</h1>
            </div>
        );
    }
}

export default Loading;