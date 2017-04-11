'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = (app, config) => {
    // connect to mongoose
    const options = {
        server: {
            socketOptions: {keepAlive: 1},
            poolSize: 5,
        },
    };
    mongoose.connect(config.db, options, (err) => {
        if (err) {
            console.error('Could not connect to MongoDB');
            process.exit(1);
            return;
        }
        
        if (app.get('env') === 'development' || app.get('env') === 'test') {
            mongoose.connection.db.dropDatabase();
        }
    });

    mongoose.connection
        .on('error', (err) => {
            console.log(err);
            process.exit(1);
        })
        .on('disconnected', () => {
            console.log('Failed to connect to mongodb!');
            process.exit(1);
        })
        .once('open', () => {
            console.log('Connected to mongodb!');
        });
};
