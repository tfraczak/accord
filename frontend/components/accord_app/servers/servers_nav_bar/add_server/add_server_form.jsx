import React from 'react';
import { validUrlToken } from '../../../../../utils/func_utils';

class AddServerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.submitObj;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.insertButtons = this.insertButtons.bind(this);
        this.labelWithErrors = this.labelWithErrors.bind(this);
        this.clickClose = this.clickClose.bind(this);
    }

    componentWillUnmount() {
        debugger
        this.props.removeServerErrors();
    }

    handleChange(e) {
        this.setState({
            input: e.currentTarget.value
        });
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
                const server = {
                    name: this.state.input,
                    ownerId: currentUser.id,
                };
                processForm(server).then(newServer => {
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
            
        return (
            <h3 id={errorMsg ? "error" : null} className={className}>
                { this.props.formType === 'create' ? `SERVER NAME` : inviteLink() }
                { errorMsg }
            </h3>
        )
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

    clickClose() {
        document.getElementById("asf-button").classList.remove("active");
        this.props.closeModal();
    }

    render() {
        const { 
            formTitle,
            formSubtitle,
            inputPlaceholder,
            inputLabel,
            formType,
        } = this.props;
        
        return (
            <div className="asf-wrapper">
                <i className="fas fa-times" onClick={this.clickClose}></i>
                <h1 className="add-server-title">{formTitle}</h1>
                { formSubtitle }
                { formType === 'create' ? ( <img className="asf-create-img" alt='upload-img-placeholder' src={window.defaultServerImg} /> ) : <div className="asf-form-separator"></div> }
                <form onSubmit={this.handleSubmit} className="add-server-form">
                    <div className="asf-input-wrapper">
                        { this.labelWithErrors() }
                        <input
                            type="text"
                            className="add-server-input"
                            placeholder={inputPlaceholder}
                            value={this.state.input}
                            onChange={this.handleChange} />
                    </div>

                    { this.insertButtons() }
                </form>
            </div>
        )
    }
}

export default AddServerForm;