'use strict';

const Promise = require('bluebird');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const logger = require('../services/logger.service');
const config = require('../config');

// set database connection object
let database = null;

// get connection to mongodb
function getMongoConnection() {

    return new Promise((resolve, reject) => {

        if (database === null) {
            MongoClient.connect('mongodb://localhost:27017', (err, client) => {
                database = client.db('blockdam');
                resolve(database);
            });
        }
    });
}

module.exports = {
    getEventsCollection: function() {
        return getMongoConnection().then((conn) => {
            return conn.collection('bcdTokenEvents');
        })
    }
};



