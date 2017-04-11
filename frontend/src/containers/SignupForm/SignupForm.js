import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import constants from '../../constants';
import Authentication from '../../core/authentication';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                username: '',
                email: '',
                password: '',
                first_name: '',
                last_name: ''
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

    signup(e) {
        e.preventDefault();

        fetch(`${constants.API_ENDPOINT}/auth/signup`, {
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
            <form onSubmit={(e) => { this.signup(e); }} className="Signup-form">
                { this.state.error !== '' && <div className="Signup-error">
                    { this.state.error }
                </div> }
                <input
                    type="text"
                    name="username"
                    required
                    placeholder="username"
                    onChange={(e) => { this.handleInputChange(e); }}
                    value={this.state.formData.username}
                />
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="email"
                    onChange={(e) => { this.handleInputChange(e); }}
                    value={this.state.formData.email}
                />
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="password"
                    onChange={(e) => { this.handleInputChange(e); }}
                    value={this.state.formData.password}
                />
                <input
                    type="text"
                    name="first_name"
                    placeholder="first name"
                    onChange={(e) => { this.handleInputChange(e); }}
                    value={this.state.formData.first_name}
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="last name"
                    onChange={(e) => { this.handleInputChange(e); }}
                    value={this.state.formData.last_name}
                />
                <input type="submit" value="signup"/>
            </form>
        );
    }
}

export default SignupForm;
