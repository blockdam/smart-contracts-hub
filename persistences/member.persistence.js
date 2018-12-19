'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const db = require('../connectors/mongodb.connector');
const config = require('../config');
const moment = require('moment');


/**
 * Class takes care of all database operations for the page
 */
class MemberPersistence {

    constructor() {

    }

    findAll(options) {
        const self = this;
        return new Promise((resolve, reject) => {
            db.getMembersCollection() // get page collection
                .then((collection) => { return collection.find({}).toArray(); }) // execute find query
                .then((result) => { resolve(result);})
                .catch( (err) => { reject(err); })
        })
    }

    findOne(id) {
        let self = this,
            param = 'wpid';

        if(id.length === 42) {
            param = 'ethAddress';
        }

        return new Promise((resolve, reject) => {
            db.getMembersCollection() // get page collection
                .then((collection) => { return collection.findOne({ param : id}); }) // execute find query
                .then((result) => { resolve(result);})
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

module.exports = MemberPersistence;