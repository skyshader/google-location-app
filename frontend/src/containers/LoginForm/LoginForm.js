import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import constants from '../../constants';
import Authentication from '../../core/authentication';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                username: '',
                password: ''
            },
            error: '',
            success: false
        };
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        const formData = Object.assign({}, this.state.formData, { [name]: value });
        this.setState(Object.assign({}, this.state, { formData }));
    }

    login(e) {
        e.preventDefault();

        fetch(`${constants.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(this.state.formData),
            headers: new Headers({'Content-Type': 'application/json'})
        })
            .then(_ => _.json())
            .then(result => {
                if (!result.success) {
                    return this.handleError(result.error);
                }

                return this.handleSuccess(result.data);
            })
            .catch((err) => this.handleError(err));
    }

    handleSuccess(result) {
        Authentication.login(result.token, result.user);
        this.setState(Object.assign({}, this.state, { success: true }));
    }

    handleError(err) {
        const error = err.error || err;
        if (error.message) {
            this.setState(Object.assign({}, this.state, { error: error.message }));
            setTimeout(() => {
                this.setState(Object.assign({}, this.state, { error: '' }));
            }, 3000);
        }
    }

    render() {
        if (this.state.success) {
            return (
                <Redirect to={{
                    pathname: '/'
                }}/>
            );
        }

        return (
            <form onSubmit={(e) => { this.login(e); }} className="Login-form">
                { this.state.error !== '' && <div className="Login-error">
                    { this.state.error }
                </div> }

                <input
                    type="text"
                    name="username"
                    required
                    placeholder="username/email"
                    onChange={(e) => { this.handleInputChange(e); }}
                    value={this.state.formData.username}
                />
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="password"
                    onChange={(e) => { this.handleInputChange(e); }}
                    value={this.state.formData.password}
                />
                <input type="submit" value="login"/>
            </form>
        );
    }
}

export default LoginForm;
