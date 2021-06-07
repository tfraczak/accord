import React from 'react';

class ChannelSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.channel;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickClose = this.clickClose.bind(this);
    }

    insertContent() {
        switch(this.state.content) {
            case "OVERVIEW":
                return (
                    <>
                        <h1 className="content-title">{ this.state.content }</h1>
                        <h3 className="edit-channel-label">CHANNEL NAME</h3>
                        <form onSubmit={ this.handleSubmit } className="edit-channel-form">
                            <input id="edit-channel-input" type="text" onChange={ this.handleChange } />
                            <div className="buttons-wrapper">
                                <p className="update-message">Careful — you have unsaved changes!</p>
                                <div className="buttons">
                                    <button className="reset" type="button">Reset</button>
                                    <button disabled={ !!this.state.name } className="save" type="submit">Save Changes</button>
                                </div>
                            </div>
                        </form>

                    </>
                );
            default:
                return null;
        }
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.closeModal();
        deleteChannel(this.props.channel)
            .then(() => {
                this.props.history.push(`/channels/${this.props.match.params.serverId}`)
            });
    }

    handleChange(e) {
        this.setState({
            name: e.currentTarget.value,
        });
    }

    handleSubmit(e) {
        
        e.preventDefault();
        const {
            updateChannel,
        } = this.props;

        Object.freeze(this.state);
        const channel = this.state;
        updateChannel(channel)
            .then(() => {
                closeModal();
                document.getElementById("edit-channel-btn").classList.remove("modal-open");
            });
    }

    clickClose() {
        this.props.closeModal();
        document.getElementById("edit-channel-btn").classList.remove("modal-open");
    }

    render() {
        const { 
            channel,
        } = this.props;

        let title = "# " + this.state.channel.name + "TEXT CHANNEL";
        const category = channel.mediaType === "Text" ? "TEXT CHANNELS" : "VOICE CHANNELS";
        let titleLengthDiff = title.length - 21;
        let textLengthDiff = "TEXT CHANNELS".length - titleLengthDiff;
        let voiceLengthDiff = "VOICE CHANNELS".length - titleLengthDiff;
        const categoryTitle = () => {
            switch(category) {
                case "TEXT CHANNELS":
                    if (textLengthDiff < 0) {
                        return <h2 className="channel-category">{ category }</h2>;
                    } else if (textLengthDiff === 0) {
                        return <h2 className="channel-category">{ category + "..." }</h2>;
                    } else if (textLengthDiff < category.length) {
                        return <h2 className="channel-category">{ category.slice(-category.length, -textLengthDiff) + "..." }</h2>;
                    } else {
                        return null;
                    }
                case "VOICE CHANNELS":
                    if (voiceLengthDiff < 0) {
                        return category;
                    } else if (voiceLengthDiff === 0) {
                        return category + "...";
                    } else if (voiceLengthDiff < category.length) {
                        return category.slice(-category.length, -voiceLengthDiff) + "...";
                    } else {
                        return null;
                    }
                default:
                    return null;
            }
        };
        let titleWithoutCategory = "# " + channel.name;
        let channelNameDiff = titleWithoutCategory.length - 21;
        const channelTitle = () => {
            if (channelNameDiff < 0) {
                return (
                    <>
                        { channel.mediaType === "Text" ? (<i className="fas fa-hashtag"></i>) : (<i className="fas fa-volume-up"></i>) }
                        <h1 className="channel-name">{ ` ${channel.name} ` }</h1>
                    </>
                );
            } else if (channelNameDiff === 0) {
                return (
                    <>
                        { channel.mediaType === "Text" ? (<i className="fas fa-hashtag"></i>) : (<i className="fas fa-volume-up"></i>) }
                        <h1 className="channel-name">{ ` ${channel.name}...` }</h1>
                    </>
                );
            } else {
                const channelName = channel.name.slice(-titleWithoutCategory.length, -channelNameDiff);
                return (
                    <>
                        { channel.mediaType === "Text" ? (<i className="fas fa-hashtag"></i>) : (<i className="fas fa-volume-up"></i>) }
                        <h1 className="channel-name">{ ` ${channelName}...` }</h1>
                    </>
                );
            }
        };
        let sidebarTitle = (
            <div id="csm-title">
                { channelTitle() }
                { categoryTitle() }
            </div>
        );
        

        return (
            <div className="channel-settings-wrapper">
                <div className="sidebar-wrapper">
                    { sidebarTitle }
                    <ul className="sidebar-nav">
                        <li className="channel-settings-item edit">Overview</li>
                        <li className="list-item-separator"><div className="separator"></div></li>
                        <li className="channel-settings-item delete"><button className="delete-button" disabled={ this.state.default } onClick={ this.handleDelete }>Delete Channel</button></li>
                    </ul>
                </div>
                <div className="csm-content">
                    { this.insertContent() }
                </div>
            </div>
        )
    }
}

export default ChannelSettings;