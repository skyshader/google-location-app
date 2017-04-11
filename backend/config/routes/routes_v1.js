'use strict';

const express = require('express');
const router = express.Router();

const authorization = require('./../middlewares/authorization');

// load versioned controllers
const main = require('../../app/controllers/v1/base');
const user = require('../../app/controllers/v1/user');
const auth = require('../../app/controllers/v1/auth');
const location = require('../../app/controllers/v1/location');

// define routes
module.exports = function(passport) {

    // Add api version to the response
    router.use(function(req, res, next) {
        res._json = res.json;
        res.json = function json(obj) {
            obj.APIversion = 1;
            res._json(obj);
        };
        next();
    });

    // All routes definition goes here
    router.get('/', main.index);

    router.post('/auth/login', auth.login);
    router.post('/auth/signup', auth.signup);

    router.get('/users', authorization.isAuthenticated, user.index);

    router.get('/location', authorization.isAuthenticated, location.index);
    router.post('/location', authorization.isAuthenticated, location.create);

    return router;
};
