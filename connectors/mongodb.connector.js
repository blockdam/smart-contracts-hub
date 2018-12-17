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
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            // Client returned
            database = client.db('blockdam');
            return database;
        });
    }
}

module.exports = {
    getEventsCollection: function() {
        return getMongoConnection().then((conn) => {
            console.log(conn);
            return conn.collection('bcdTokenEvents');
        })
    }
};



