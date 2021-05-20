import React, { Component } from 'react';

class ServerToolbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.server.name,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.currentTarget.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const server = Object.assign({}, this.state);
        this.props.updateServer(server);
    }

    render() {
        const name = this.props.server.name
        return (
            <li onClick={e => e.stopPropagation()}>
                <form onClick={e => e.stopPropagation()} className="st-update-form" onSubmit={this.handleSubmit}>
                    <input
                        className="st-update-input"
                        type="text"
                        placeholder={name}
                        onChange={this.handleChange}
                        onClick={e => e.stopPropagation()} />
                    <button className="st-update-btn" type="submit">UPDATE</button>
                </form>
            </li>
        )
    }
}

export default ServerToolbar;
