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
    if(database === null) {
        database =  MongoClient.connect(config.db, { promiseLibrary: Promise, poolSize: 10 })
    }
    return database;
}

module.exports = {
    getEventsCollection: function() {
        return getMongoConnection().then((conn) => {
            return conn.collection('token_events');
        })
    }
};



