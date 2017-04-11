'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const response = require('./../../../config/responses');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Location = mongoose.model('Location');

module.exports = {
    index: (req, res) => {
        Location.find({ 'user_id': req.user.id }, null, { sort: { createdAt: -1 } })
            .then(locations => {
                const data = locations.map((location) => location.toJSON());
                return response.ok(res, { locations: data });
            })
            .catch(err => {
                return response.error(res, err);
            })
    },

    create: (req, res) => {
        Promise.coroutine(function*() {
            const location_data = _.omit(req.body, ['id', '_id']);
            location_data.user_id = req.user.id;

            let location = yield Location.findOne({ 'place_id': location_data.place_id, 'user_id': location_data.user_id });
            if (location) {
                return response.error(res, { message: 'Location already exists!' });
            }

            location = new Location(location_data);
            yield location.save();

            return response.created(res, { location });
        })()
            .catch((err) => {
                if (err.errors) {
                    const errors = {
                        validation: {},
                        message: 'Failed to add a new location!'
                    };

                    _.forEach(err.errors, (error, field) => {
                        errors.validation[field] = error.message;
                    });

                    return response.validationFailed(res, errors);
                }

                return response.error(res, err);
            });
    }
};
