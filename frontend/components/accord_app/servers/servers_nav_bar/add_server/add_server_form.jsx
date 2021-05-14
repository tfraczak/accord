import React from 'react';

class AddServerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.submitObj;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.insertButtons = this.insertButtons.bind(this);
    }

    handleChange(e) {
        this.setState({
            input: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { formType } = this.props;  
        Object.freeze(this.state);
        switch(formType) {
            case 'create':
                const server = {
                    name: this.state.input,
                    ownerId: this.props.currentUser.id,
                };
                this.props.processForm(server).then(newServer => {
                    this.props.closeModal();
                    this.props.history.push(`./channels/${newServer.id}`);
                });
                break;
            case 'join':
                const urlToken = this.state.input.slice(-10);
                this.props.processForm(urlToken).then(newServer => {
                    this.props.closeModal();
                    this.props.history.push(`./channels/${newServer.id}`);
                });
                break;
            default:
                return;
        }
    }

    insertErrors() {
        const { errors } = this.props;
    }

    insertButtons() {
        const { otherForm, formType, formFooter } = this.props;
        switch(formType) {
            case 'create':
                return (
                    <div className="asf-button-wrapper create">
                        <button type="submit" className="asf-create submit" value="Create">Create</button>
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
                            <button type="submit" className="asf-join submit" value="Join Server">Join Server</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
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
            <>
                <h1 className="add-server-title">{formTitle}</h1>
                { formSubtitle }
                { formType === 'create' ? ( <img className="asf-create-img" alt='upload-img-placeholder' src={window.defaultServerImg} /> ) : <div className="asf-form-separator"></div> }
                <form onSubmit={this.handleSubmit} className="add-server-form">
                    <div className="asf-input-wrapper">
                        { inputLabel }
                        <input
                            type="text"
                            className="add-server-input"
                            placeholder={inputPlaceholder}
                            value={this.state.input}
                            onChange={this.handleChange} />
                    </div>

                    { this.insertButtons() }
                </form>
            </>
        )
    }
}

export default AddServerForm;