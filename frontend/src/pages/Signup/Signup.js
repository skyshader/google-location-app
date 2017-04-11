import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import SignupForm from '../../containers/SignupForm';

class Signup extends Component {
    render() {
        return (
            <div className="Signup-container">
                <h2 className="heading">Signup</h2>

                <SignupForm/>

                <Link className="Signup-container-link" to="/login">Already a member? Login!</Link>
            </div>
        );
    }
}

export default Signup;
