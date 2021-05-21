import React from 'react';

class CreateChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.submitObj;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickClose = this.clickClose.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        
        e.preventDefault();
        const {
            server,
            closeModal,
            history,
            processForm,
        } = this.props;

        Object.freeze(this.state);
        const channel = this.state;
        processForm(channel)
            .then(newChannel => {
                closeModal();
                document.getElementById("add-channel-btn").classList.remove("modal-open");
            });
    }

    clickClose() {
        this.props.closeModal();
        document.getElementById("add-channel-btn").classList.remove("modal-open");
    }

    render() {
        const { 
            formTitle,
            formSubtitle,
            inputPlaceholder
        } = this.props;

        return (
            <div className="create-channel-wrapper">
                <i className="fas fa-times" onClick={this.clickClose}></i>
                <h1 className="create-channel-title">{formTitle}</h1>
                { formSubtitle }
                <form onSubmit={this.handleSubmit} className="add-channel-form">
                    <div className="acf-input-wrapper">
                        <h3 className="input-label channel">channel name</h3>
                        <input
                            type="text"
                            className="create-channel-input"
                            placeholder={ inputPlaceholder }
                            value={this.state.name}
                            onChange={this.handleChange} />
                    </div>
                    <div className="create-channel-btns-wrapper">
                        <button type="button" onClick={this.clickClose} className="create-channel-cancel">Cancel</button>
                        <button 
                            type="submit"
                            disabled={ !this.state.name }
                            className={ this.state.name ? "create-channel-submit" : "create-channel-submit disabled" } >Create Channel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateChannel;