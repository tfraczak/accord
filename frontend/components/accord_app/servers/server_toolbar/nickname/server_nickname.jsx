import React from 'react';

class ServerNickname extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentUser.membership;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetNickname = this.resetNickname.bind(this);
        this.clickClose = this.clickClose.bind(this);
    }

    handleChange(e) {
        this.setState({
            localUsername: e.currentTarget.value
        });
    }

    resetNickname() {
        this.setState({
            localUsername: ""
        });
    }

    handleSubmit(e) {
        
        e.preventDefault();
        const {
            closeModal,
            changeNickname,
        } = this.props;

        Object.freeze(this.state);
        const membership = this.state;
        changeNickname(membership)
            .then(
                () => closeModal()
            );
    }

    clickClose() {
        this.props.closeModal();
    }

    render() {
        const {
            currentUser
        } = this.props;
        debugger
        return (
            <div className="nickname-wrapper">
                <h6 className="close" onClick={ this.clickClose }>+</h6>
                <h1 className="nickname-title">Change Nickname</h1>
                <form onSubmit={ this.handleSubmit } className="nickname-form">
                    <div className="nickname-input-wrapper">
                        <h3 className="input-label nickname">NICKNAME</h3>
                        <input
                            type="text"
                            className="nickname-input"
                            id="nickname-input"
                            placeholder={ currentUser.username }
                            value={ this.state.localUsername }
                            onChange={ this.handleChange }
                        />
                        <button
                            type="button"
                            onClick={ this.resetNickname }
                        >
                            Reset Nickname
                        </button>
                    </div>
                    <div className="nickname-btns-wrapper">
                        <button 
                            type="button"
                            onClick={ this.clickClose }
                            className="nickname-cancel"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="nickname-submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ServerNickname;