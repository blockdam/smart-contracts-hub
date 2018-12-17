'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const db = require('../connectors/mongodb.connector');
const config = require('../config');
const moment = require('moment');


/**
 * Class takes care of all database operations for the page
 */
class EventPersistence {

    constructor() {

    }


    /**
     * Query page collections in MongoDB
     * @param options
     * @param correlationId
     */
    find(options) {
        const self = this;
        if (typeof options.limit === "undefined") {
            options.limit = 0;
        };
        return new Promise((resolve, reject) => {
            db.getEventsCollection() // get page collection
                .then((collection) => { return collection.find(options.query).sort({'created_at' : -1}).limit(options.limit).toArray(); }) // execute find query
                .then((result) => {
                    result.forEach( i => {
                        i.id = i._id;
                    });
                    resolve(result);

                }) // return results
        })
    }


    /**
     * Query page collection in MongoDb and return single document
     * @param options
     * @param correlationId
     */
    findOne(options, correlationId) {
        const self = this;
        return new Promise((resolve, reject) => {
            db.getEventsCollection() // get page collection
                .then((collection) => { return collection.findOne(options.query); }) // execute find query
                .then((result) => { resolve(result); }) // return results
        })
    }


    /**
     * Save page to database
     * @param data
     * @param correlationId
     */
    save(data) {
        const self = this;
        let collection = null;
        return new Promise((resolve, reject) => {

            db.getEventsCollection()
                // .then( (coll) => { return new Promise((res, rej) => {  collection = coll; res({}); })
                // .then( () => { return collection.findOne({ '_id' : data._id}); })
                // .then( (exists) => {
                //     if (exists) {
                //         return collection.updateOne(data);
                //     } else {
                //         return collection.insertOne(data);
                //     }
                // })
                // .then(() => {
                //     logger.info('Saved event to database');
                //     resolve();
                // })
                .catch((error) => {
                    // error.correlationId = correlationId;
                    reject(error);
                });
        });
    }


    /**
     * Delete page from database
     * @param id                        id of the page
     * @param correlationId
     */
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