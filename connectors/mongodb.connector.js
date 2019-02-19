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
            MongoClient.connect('mongodb://localhost:27017', { promiseLibrary: Promise, poolSize: 10, useNewUrlParser: true }, (err, client) => {
                database = client.db(config.db);
                resolve(database);
            });
        } else {
            resolve(database);
        }
    });
}

module.exports = {
    getEventsCollection: function() {
        return getMongoConnection().then((conn) => {
            return conn.collection('bcdTokenEvents');
        })
    },
    getMembersCollection: function() {
        return getMongoConnection().then((conn) => {
            return conn.collection('members');
        })
    },
    getLinksCollection: function() {
        return getMongoConnection().then((conn) => {
            return conn.collection('links');
        })
    },
    getMintersCollection: function() {
        return getMongoConnection().then((conn) => {
            return conn.collection('dao_voucherMintGuardian');
        })
    },
    getVouchersCollection: function() {
        return getMongoConnection().then((conn) => {
            return conn.collection('dao_voucherRegistry');
        })
    },
    getProposalsCollection: function() {
        return getMongoConnection().then((conn) => {
            return conn.collection('dao_proposalRegistry');
        })
    }
};



