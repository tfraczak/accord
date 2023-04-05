import React from 'react';

class CreateChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.submitObj;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickClose = this.clickClose.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.clickClose();
        }
    }

    componentDidMount() {
        const input = document.getElementById("create-channel-input");
        input.addEventListener("paste", e => e.preventDefault());
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        const input = document.getElementById("create-channel-input");
        input.removeEventListener("paste", e => e.preventDefault());
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleChange(e) {
        const isValid = 
            !/[~`()\@\.\s_!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(e.currentTarget.value) && 
            !/\-\-+/g.test(e.currentTarget.value) && 
            !/^\-/g.test(e.currentTarget.value);
        if (isValid) {
            this.setState({
                name: e.currentTarget.value
            });
        }
        
    }

    handleSubmit(e) {
        
        e.preventDefault();
        const {
            closeModal,
            serverSub,
        } = this.props;

        Object.freeze(this.state);
        const channel = this.state;
        serverSub.newChannel({ channel }, serverSub);
        closeModal();
        document.getElementById("add-channel-btn").classList.remove("modal-open");
        document.getElementById("toggle-channels-index").classList.remove("hidden");
        document.getElementById("channels-index").classList.remove("hidden");
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
            <div ref={ this.setWrapperRef } className="create-channel-wrapper">
                {/* <i className="fas fa-times" onClick={this.clickClose}></i> */}
                <h6 className="close" onClick={this.clickClose}>+</h6>
                <h1 className="create-channel-title">{formTitle}</h1>
                { formSubtitle }
                <form onSubmit={this.handleSubmit} className="add-channel-form">
                    <div className="acf-input-wrapper">
                        <h3 className="input-label channel">channel name</h3>
                        <input
                            type="text"
                            className="create-channel-input"
                            id="create-channel-input"
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