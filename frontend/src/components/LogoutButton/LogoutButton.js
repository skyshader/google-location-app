import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Authentication from '../../core/authentication';

class LogoutButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false
        };
    }

    logout() {
        Authentication.logout();
        this.setState(Object.assign({}, this.state, { success: true }));
    }

    render() {
        if (this.state.success) {
            return (
                <Redirect to={{
                    pathname: '/login'
                }}/>
            );
        }

        return (
            <button onClick={() => { this.logout(); }} className="LogoutButton">
                Logout
            </button>
        );
    }
}

export default LogoutButton;
