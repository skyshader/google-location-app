import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import RouteManager from './RouteManager';
import './index.css';

ReactDOM.render(
    <App><RouteManager /></App>,
    document.getElementById('root')
);
