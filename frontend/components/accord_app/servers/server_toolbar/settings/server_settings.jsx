import React from 'react';
import ServerSettingsOverview from './server_settings_overview';
import ServerMembersListContainer from './members/server_members_list_container';
import InvitesListContainer from './invitations/invites_list_container';

class ServerSettings extends React.Component {
    constructor(props) {
        super(props);

		this.state = {};
		const server = Object.assign({}, { ...props.server });
		Object.freeze(server);
        this.state = Object.assign({}, server);
		this.state.content = "overview";

        this.handleName = this.handleName.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickClose = this.clickClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReset = this.handleReset.bind(this);
		this.fileOpen = this.fileOpen.bind(this);
		this.insertContent = this.insertContent.bind(this);
        this.setState = this.setState.bind(this);
    }

	hovered(e) {
		e.stopPropagation();
        document.getElementById("plus").classList.add("hovered");
	}

	notHovered(e) {
		e.stopPropagation();
        document.getElementById("plus").classList.remove("hovered");
	}

    handleDelete(e) {
        e.preventDefault();
        this.props.closeModal();
        if (parseInt(this.props.location.pathname.split("/")[2]) === this.props.server.id) {
            this.props.history.push(`/channels/@me`);
        }
        this.props.deleteServer(this.props.server.id);
    }

    handleReset() {
        const save = document.getElementById("ssf-buttons-wrapper");
        save.classList.remove("active");
        this.setState({
            name: this.props.server.name,
			imageUrl: this.props.server.imageUrl
        });
    }

    handleName(e) {
		const save = document.getElementById("ssf-buttons-wrapper");
		if (e.currentTarget.value !== this.props.server.name || this.state.imageUrl !== this.props.server.imageUrl) {
			save.classList.add("active");
		} else {
			save.classList.remove("active");
		}
		
		this.setState({
			name: e.currentTarget.value,
		});
    }

	fileOpen(e) {
        e.preventDefault();
        e.stopPropagation();
        const input = document.getElementById("img-input");
        input.click();
    }

	handleImage(e) {
		const reader = new FileReader();
		const file = e.currentTarget.files[0];
        const save = document.getElementById("ssf-buttons-wrapper");
		reader.onload = () => {
			this.setState({ imageUrl: reader.result, imageFile: file });
            if (this.state.imageUrl !== this.props.server.imageUrl) {
                save.classList.add("active");
            }
            document.getElementById("plus").classList.remove("hovered");
		}
		if (file) {
			reader.readAsDataURL(file);
		} else {
			this.setState({ imageUrl: this.state.imageUrl, imageFile: null });
            save.classList.remove("active");
		}
	}

	removeImage() {
        if (this.state.name === this.props.server.name) {
            document.getElementById("ssf-buttons-wrapper").classList.add("active");
        }
		this.setState({ imageUrl: "", imageFile: null });
	}

    handleSubmit(e) {
        e.preventDefault();
        const {
            updateServer,
            server
        } = this.props;

        Object.freeze(this.state);
        const formData = new FormData();

        formData.append('server[name]', this.state.name);
        if(this.state.imageUrl !== this.props.server.imageUrl) formData.append('server[image_url]', this.state.imageUrl);

        updateServer(formData, server.id)
            .then(() => {
                document.getElementById("ssf-buttons-wrapper").classList.remove("active");
            });
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escModal, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escModal);
    }

    escModal(e) {
		if (e.keyCode === 27) {
			this.clickClose();
		}
	}

    clickClose() {
        this.props.closeModal();
    }

	insertContent() {
		switch(this.state.content) {
			case "overview":
				return (
					<ServerSettingsOverview 
						key={ `sso-${this.props.server.id}` }
						name={ this.state.name }
						imageUrl={ this.state.imageUrl }
						handleName={ this.handleName }
						handleImage={ this.handleImage }
						removeImage={ this.removeImage }
						handleSubmit={ this.handleSubmit }
						handleReset={ this.handleReset }
						hovered={ this.hovered }
						notHovered={ this.notHovered }
						fileOpen={ this.fileOpen }
                        isOwner={ this.props.isOwner }
					/>
				);
            case "members":
                return (
                    <ServerMembersListContainer />
                )
            case "invites":
                return (
                    <InvitesListContainer />
                )
			default:
				return null;
		}
	}

    render() {
		const {
			server,
		} = this.props;
        if (!server) return null;
        const textLimit = 24;
		let title;
        if (this.state.name.length <= textLimit) {
			title = this.state.name;
		} else {
			title = this.state.name.slice(0,textLimit-1).concat("...");
		}

		const sidebarTitle = ( <h1 className="server-name">{ title }</h1> )
        
        return (
            <div className="server-settings-wrapper">
                <div className="sidebar-wrapper">
                    <nav>
                        { sidebarTitle }
                        <ul className="sidebar-nav">
                            <li onClick={ () => this.setState({ content: "overview" }) }className={`server-settings-item edit ${this.state.content === "overview" ? "active" : ""}`} >Overview</li>
                            <div className="separator"></div>
							<li onClick={ () => this.setState({ content: "members" }) }className={`server-settings-item members ${this.state.content === "members" ? "active" : ""}`} >Members</li>
							<li onClick={ () => this.setState({ content: "invites" }) }className={`server-settings-item invites ${this.state.content === "invites" ? "active" : ""}`} >Invites</li>
                            <div className="separator"></div>
                            <li className="server-settings-item delete">
                                <button
                                    className="delete-button"
                                    disabled={ !this.props.isOwner }
                                    onClick={ this.handleDelete }>
                                        Delete Server
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="server-settings-content-wrapper">
                    { this.insertContent() }
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

export default ServerSettings;