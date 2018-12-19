'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const db = require('../connectors/mongodb.connector');
const config = require('../config');
const moment = require('moment');


class EventPersistence {

    constructor() {}

    find(options) {
        const self = this;
        if (typeof options.limit === "undefined") {
            options.limit = 0;
        };
        return new Promise((resolve, reject) => {
            db.getEventsCollection() // get page collection
                .then((collection) => { return collection.find(options.query).sort({'date' : 1}).limit(options.limit).toArray(); }) // execute find query
                .then((result) => {
                    resolve(result);
                })
                .catch( (err) => {
                    reject(err);
                })

        })
    }

    findOne(options, correlationId) {
        const self = this;
        return new Promise((resolve, reject) => {
            db.getEventsCollection() // get page collection
                .then((collection) => { return collection.findOne(options.query); }) // execute find query
                .then((result) => { resolve(result); }) // return results
        })
    }

    save(data) {
        const self = this;
        let collection = null;
        return new Promise((resolve, reject) => {

            db.getEventsCollection()
                .then( (coll) => {
                    return new Promise((res, rej) => {  collection = coll; res({}); })
                })
                .then( () => { return collection.replaceOne({ '_id' : data._id }, data, { 'upsert': true }); })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    delete(id, correlationId) {
        const self = this;
        return new Promise((resolve, reject) => {
            db.getEventsCollection() // get page collection
                .then((collection) => { return collection.remove({"_id": id}); }) // execute delete
                .then((d) => {
                    logger.info('Deleted event from database', correlationId);
                    resolve(id);
                })
                .catch((error) => {
                    // error.correlationId = correlationId;
                    reject(error);
                })
        })
    }
}

module.exports = EventPersistence;