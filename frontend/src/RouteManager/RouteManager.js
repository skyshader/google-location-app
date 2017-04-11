import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Authentication from '../core/authentication';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        Authentication.isAuthenticated() ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const AuthRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        !Authentication.isAuthenticated() ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

function RouteManager() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={Home}/>
                <AuthRoute path="/login" component={Login}/>
                <AuthRoute path="/signup" component={Signup}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}

export default RouteManager;
