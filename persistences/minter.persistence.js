'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const db = require('../connectors/mongodb.connector');
const config = require('../config');
const moment = require('moment');


/**
 * Class takes care of all database operations for the page
 */
class MinterPersistence {

    constructor() {

    }

    findAll(options) {
        const self = this;
        return new Promise((resolve, reject) => {
            db.getMintersCollection() // get page collection
                .then((collection) => { return collection.find({}).toArray(); }) // execute find query
                .then((result) => { resolve(result);})
                .catch( (err) => { reject(err); })
        })
    }

    findMinters() {
        let self = this,
        query = {
                budget : { $gt : 0 }
            };

        return new Promise((resolve, reject) => {
            db.getMintersCollection() // get page collection
                .then((collection) => { return collection.find(query).toArray(); }) // execute find query
                .then((result) => { resolve(result);})
                .catch( (err) => { reject(err); })
        })
    }

    isMinter(permissions) {

        let self = this,
            query = {
           
            };

        return new Promise((resolve, reject) => {

            db.getMintersCollection() // get page collection
                .then((collection) => { return collection.find(query).toArray(); }) // execute find query
                .then((result) => {
                    if (result){
                        logger.info(result);
                        permissions.minter = true;
                    } else {
                        permissions.minter = false;
                    }
                    resolve(permissions);
                })
                .catch( (err) => { reject(err); })
        })

    }

    // save(data) {
    //     const self = this;
    //     let collection = null;
    //     return new Promise((resolve, reject) => {
    //
    //         db.getMembersCollection()
    //             .then( (coll) => {
    //                 return new Promise((res, rej) => {  collection = coll; res({}); })
    //             })
    //             .then( () => { return collection.replaceOne({ '_id' : data._id }, data, { 'upsert': true }); })
    //             .then(() => {
    //                 resolve();
    //             })
    //             .catch((error) => {
    //                 reject(error);
    //             });
    //     });
    // }
    //
    // delete(id, correlationId) {
    //     const self = this;
    //     return new Promise((resolve, reject) => {
    //         db.getMembersCollection() // get page collection
    //             .then((collection) => { return collection.remove({"_id": id}); }) // execute delete
    //             .then((d) => {
    //                 logger.info('Deleted member from database', correlationId);
    //                 resolve(id);
    //             })
    //             .catch((error) => {
    //                 // error.correlationId = correlationId;
    //                 reject(error);
    //             })
    //     })
    // }
}

module.exports = MinterPersistence;