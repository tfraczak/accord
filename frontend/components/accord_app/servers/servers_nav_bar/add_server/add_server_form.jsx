import React from 'react';
import { validUrlToken } from '../../../../../utils/func_utils';
import ImageInput from "../../../util/image_input";

class AddServerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.submitObj;
        this.handleInput = this.handleInput.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.insertButtons = this.insertButtons.bind(this);
        this.insertServerImg = this.insertServerImg.bind(this);
        this.labelWithErrors = this.labelWithErrors.bind(this);
        this.clickClose = this.clickClose.bind(this);

    }

    componentWillUnmount() {
        this.props.removeServerErrors();
    }

    handleInput(e) {
        this.setState({
            input: e.currentTarget.value
        });
    }

    hovered(e) {
        e.stopPropagation();
        document.getElementById("plus").classList.add("hovered");
    }

    notHovered(e) {
        e.stopPropagation();
        document.getElementById("plus").classList.remove("hovered");
    }

    fileOpen(e) {
        e.preventDefault();
        e.stopPropagation();
        const input = document.getElementById("img-input");
        input.click();
    }

    handleSubmit(e) {
        e.preventDefault();
        const {
            formType,
            closeModal,
            history,
            processForm,
            currentUser,
            receiveServerErrors,
        } = this.props;

        Object.freeze(this.state);
        switch(formType) {
            case 'create':
                const formData = new FormData();
                
                formData.append('server[name]', this.state.input);
                formData.append('server[owner_id]', currentUser.id);
                if (this.state.imageFile) formData.append('server[image]', this.state.imageFile);
                
                processForm(formData)
                    .then(newServer => {
                        closeModal();
                        document.getElementById("asf-button").classList.remove("active");
                        // history.push(`./channels/${newServer.id}`);
                    });

                break;
            case 'join':
                const urlToken = validUrlToken(this.state.input);
                if (urlToken) {
                    processForm(urlToken, currentUser.id)
                        .then(() => {
                            closeModal();
                            document.getElementById("asf-button").classList.remove("active");
                        }, err => {
                            receiveServerErrors(err.responseJSON);
                        });
                    break;
                } else {
                    receiveServerErrors(["Link or token is invalid"]);
                    break;
                }
            default:
                return;
        }
    }

    labelWithErrors() {
        const errors = this.props.serverErrors;
        let errorMsg;
        let className;
        switch(errors[0]) {
            case "Name can't be blank":
                errorMsg = " - Server name can't be empty.";
                break;
            case "Link or token is invalid":
                errorMsg = " - Please enter a valid invite link or invite code.";
                break;
            case "Invitation does not exist.":
                errorMsg = " - The invite is invalid or has expired.";
                break;
            case "You're already a member!":
                errorMsg = " - " + errors[0];
                break;
            case "Invite code is expired.":
                errorMsg = " - The invite is invalid or has expired.";
                break;
            default:
                errorMsg = null;
        }
        className = "server-form-input-label" + (errorMsg ? " error" : "");
        const inviteLink = () => {
            if (!errorMsg) {
                return(
                    <>
                        {"INVITE LINK "} <span style={{color: "red"}}>*</span>
                    </>
                )
            } else {
                return "INVITE LINK";
            }
        }
            
        return [(
            <div id={errorMsg ? "error" : null} className={className}>
                { this.props.formType === 'create' ? `SERVER NAME` : inviteLink() }&nbsp;
                <h6>
                    { errorMsg }
                </h6>
            </div>
        ), errorMsg ? true : false];
    }

    insertButtons() {
        const { otherForm, formType, formFooter } = this.props;
        switch(formType) {
            case 'create':
                return (
                    <div className="asf-button-wrapper create">
                        <button type="submit" disabled={ !this.state.input } className="asf-create submit" value="Create">Create</button>
                        <div className="asf-to-join-wrapper">
                            { formFooter }
                            { otherForm }
                        </div>
                    </div>
                );
            case 'join':
                return (
                    <div className="asf-button-wrapper join">
                        { formFooter }
                        <div className="join-footer-buttons-wrapper">
                            { otherForm }
                            <button type="submit" disabled={ !this.state.input } className="asf-join submit" value="Join Server">Join Server</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    insertServerImg() {
        switch(this.props.formType) {
            case "create":
                return (
                    <div className="image-upload-wrapper">
                        <ImageInput 
                            hovered={ this.hovered }
                            notHovered={ this.notHovered }
                            handleImage={ this.handleImage }
                            imageUrl={ this.state.imageUrl }
                            isOwner={ true }
                        />
                        {
                            this.state.imageUrl ? 
                            <img src={ this.state.imageUrl } className="upload-img img" type="text" /> :
                            null
                        }
                        <p onClick={this.fileOpen} onMouseOver={ this.hovered } onMouseOut={ this.notHovered } id="plus" className="plus">
                            <span>+</span>
                            <i onClick={this.fileOpen} onMouseOver={ this.hovered } onMouseOut={ this.notHovered } className="fas fa-camera"></i>
                        </p>
                    </div>
                );
            case "join":
                return <div className="asf-form-separator"></div>;
            default:
                return null;
        }
    }

    handleImage(e) {
		const reader = new FileReader();
		const file = e.currentTarget.files[0];
		reader.onloadend = () => this.setState({ imageUrl: reader.result, imageFile: file });
		if (file) {
			reader.readAsDataURL(file);
		} else {
			this.setState({ imageUrl: "", imageFile: null });
		}
	}

    clickClose() {
        document.getElementById("asf-button").classList.remove("active");
        this.props.closeModal();
    }

    render() {
        const { 
            formTitle,
            formSubtitle,
            inputPlaceholder,
            formType,
        } = this.props;
        
        return (
            <div className="asf-wrapper">
                {/* <i className="fas fa-times" onClick={ this.clickClose }></i> */}
                <h6 className="close" onClick={ this.clickClose }>+</h6>
                <h1 className="add-server-title">{ formTitle }</h1>
                { formSubtitle }
                {/* { formType === 'create' ? ( <img style="object-fit: cover" className="asf-create-img" alt='upload-img-placeholder' src={window.defaultServerImg} /> ) : <div className="asf-form-separator"></div> } */}
                { formType === 'create' ? ( this.insertServerImg() ) : <div className="asf-form-separator"></div> }
                <form onSubmit={ this.handleSubmit } className="add-server-form">
                    <div className="asf-input-wrapper">
                        { this.labelWithErrors()[0] }
                        <input
                            type="text"
                            className={this.labelWithErrors()[1] ? "add-server-input input-error" : "add-server-input"}
                            placeholder={ inputPlaceholder }
                            value={ this.state.input }
                            onChange={ this.handleInput }
                            disabled={ false } />
                    </div>

                    { this.insertButtons() }
                </form>
            </div>
        )
    }
}

export default AddServerForm;