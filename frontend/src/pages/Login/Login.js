import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import LoginForm from '../../containers/LoginForm';

class Login extends Component {
    render() {
        return (
            <div className="Login-container">
                <h2 className="heading">Login</h2>

                <LoginForm/>

                <Link className="Login-container-link" to="/signup">Don't have an account yet? Signup!</Link>
            </div>
        );
    }
}

export default Login;
