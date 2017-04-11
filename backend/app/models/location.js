'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const LocationSchema = new mongoose.Schema(
    {
        place_id:  {
            type: String,
            required: [true, 'Place Id is required!']
        },
        address: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        postal_code: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        lat: {
            type: Number,
            required: [true, 'Latitude is required!']
        },
        long: {
            type: Number,
            required: [true, 'Longitude is required!']
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User id is required!']
        }
    },
    {
        timestamps: true
    }
);

LocationSchema.set('toJSON', { getters: true, virtuals: false, transform: (doc, ret, options) => {
    delete ret.__v;
    return ret;
} });

module.exports = mongoose.model('Location', LocationSchema);
