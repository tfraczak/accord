import React from 'react';

class ChannelSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.channel;
        this.content = "overview";
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickClose = this.clickClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.closeModal();
        
        if (parseInt(this.props.match.params.channelId) === this.props.channel.id) {
            this.props.history.push(`/channels/${this.props.serverId}/${this.props.defChannelId}`);
        }
        this.props.deleteChannel(this.props.channel);
    }

    handleReset() {
        const save = document.getElementById("csf-buttons-wrapper");
        save.classList.remove("active");
        this.setState({
            name: this.props.channel.name
        });
    }

    handleChange(e) {
        const isValid = 
            !/[~`()\@\.\s_!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(e.currentTarget.value) && 
            !/\-\-+/g.test(e.currentTarget.value) && 
            !/^\-/g.test(e.currentTarget.value);
        if (isValid) {
            const save = document.getElementById("csf-buttons-wrapper");
            if (e.currentTarget.value !== this.props.channel.name) {
                save.classList.add("active");
            } else {
                save.classList.remove("active");
            }
            
            this.setState({
                name: e.currentTarget.value,
            });
        }
    }

    handleSubmit(e) {
        
        e.preventDefault();
        const {
            updateChannel,
            closeModal,
        } = this.props;

        Object.freeze(this.state);
        const channel = this.state;
        updateChannel(channel)
            .then(() => {
                closeModal();
                document.getElementById("edit-channel-btn").classList.remove("modal-open");
            });
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escModal, false);
        const input = document.getElementById("edit-channel-input");
        input.addEventListener("paste", e => e.preventDefault());
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escModal);
        const input = document.getElementById("edit-channel-input");
        input.removeEventListener("paste", e => e.preventDefault());
    }

    escModal(e) {
		if (e.keyCode === 27) {
			this.clickClose();
		}
	}

    clickClose() {
        document.getElementById("edit-channel-btn").classList.remove("modal-open");
        this.props.closeModal();
    }

    render() {

        const textLimit = 19;

        let title = "#" + this.state.name + "TEXT CHANNEL";
        const category = this.state.mediaType === "Text" ? "TEXT CHANNELS" : "VOICE CHANNELS";
        let titleLengthDiff = title.length - textLimit;
        let textLengthDiff = "TEXT CHANNELS".length - titleLengthDiff;
        let voiceLengthDiff = "VOICE CHANNELS".length - titleLengthDiff;

        const categoryTitle = () => {
            switch(category) {
                case "TEXT CHANNELS":
                    if (textLengthDiff > category.length) {
                        return <h2 className="channel-category">{ category }</h2>;
                    } else if (textLengthDiff === category.length) {
                        return <h2 className="channel-category">{ category + "..." }</h2>;
                    } else if (textLengthDiff < category.length && textLengthDiff > 0) {
                        return <h2 className="channel-category">{ category.slice(-category.length, -(category.length - textLengthDiff)) + "..." }</h2>;
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
        let titleWithoutCategory = "# " + this.state.name;
        let channelNameDiff = titleWithoutCategory.length - textLimit;
        const channelTitle = () => {
            if (channelNameDiff < 0) {
                return (
                    <>
                        { this.state.mediaType === "Text" ? (<i className="fas fa-hashtag"></i>) : (<i className="fas fa-volume-up"></i>) }
                        <h1 className="channel-name">{ `${this.state.name}` }</h1>
                    </>
                );
            } else if (channelNameDiff === 0) {
                return (
                    <>
                        { this.state.mediaType === "Text" ? (<i className="fas fa-hashtag"></i>) : (<i className="fas fa-volume-up"></i>) }
                        <h1 className="channel-name">{ `${this.state.name}...` }</h1>
                    </>
                );
            } else {
                const channelName = this.state.name.slice(-titleWithoutCategory.length, -channelNameDiff);
                return (
                    <>
                        { this.state.mediaType === "Text" ? (<i className="fas fa-hashtag"></i>) : (<i className="fas fa-volume-up"></i>) }
                        <h1 className="channel-name">{ `${channelName}...` }</h1>
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

        const isDefault = this.state.id === this.props.defChannelId;
        
        return (
            <div className="channel-settings-wrapper">
                <div className="sidebar-wrapper">
                    <nav>
                        { sidebarTitle }
                        <ul className="sidebar-nav">
                            <li className={`channel-settings-item edit ${this.content === "overview" ? "active" : ""}`} >Overview</li>
                            <li className="list-item-separator"><div className="separator"></div></li>
                            <li className="channel-settings-item delete">
                                <button
                                    className="delete-button"
                                    disabled={ this.state.default }
                                    onClick={ this.handleDelete }>
                                        Delete Channel
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="csm-content-wrapper">
                    <section>
                        <h1 className="content-title">OVERVIEW</h1>
                        <h3 className="edit-channel-label">CHANNEL NAME</h3>
                        <form onSubmit={ this.handleSubmit } className="edit-channel-form">
                            <input
                                id="edit-channel-input"
                                type="text"
                                value={ this.state.name }
                                onChange={ this.handleChange }
                            />
                            <div id="csf-buttons-wrapper" className="buttons-wrapper">
                                <p className="update-message">Careful — you have unsaved changes!</p>
                                <div className="buttons">
                                    <button onClick={this.handleReset} className="reset" type="button">Reset</button>
                                    <button disabled={ !this.state.name } className="save" type="submit">Save Changes</button>
                                </div>
                            </div>
                        </form>
                        
                    </section>
                    <div className="esc-modal">
                        <button onClick={this.clickClose}>
                            <p>×</p>
                        </button>
                        <p>ESC</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ChannelSettings;