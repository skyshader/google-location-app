'use strict';

const _ = require('lodash');
const passport = require('passport');
const JwtService = require('./../../services/jwt-service');
const response = require('./../../../config/responses');

// load necessary models
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    login: (req, res) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) return response.error(res, err);

            if (!user) {
                return response.unauthorized(res, info);
            }

            let data = {
                token: JwtService.createToken(user),
                user: user.toJSON()
            };

            return response.ok(res, data);
        })(req, res);
    },

    signup: (req, res) => {
        let user = new User(_.omit(req.body, ['id', '_id']));
        user.save()
            .then(() => {
                let data = {
                    token: JwtService.createToken(user),
                    user: user.toJSON()
                };

                return response.created(res, data);
            })
            .catch((err) => {
                if (err.errors) {
                    const errors = {
                        validation: {},
                        message: 'Failed to create a new user!'
                    };

                    _.forEach(err.errors, (error, field) => {
                        errors.validation[field] = error.message;
                    });

                    return response.validationFailed(res, errors);
                }

                if (err.name === 'MongoError' && err.code === 11000) {
                    return response.error(res, { message: 'User already exists!' });
                }

                return response.error(res, err);
            });
    }
};
