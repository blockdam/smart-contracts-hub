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
            db.getLinksCollection() // get page collection
                .then((collection) => { return collection.find({}).toArray(); }) // execute find query
                .then((result) => { resolve(result);})
                .catch( (err) => { reject(err); })
        })
    }

    findOne(id) {
        let self = this,
        query = {};

        if(id.length === 42) {
            query = {
                'ethAddress' : id
            }
        } else {
            query = {
                'wpid' : id
            }
        }

        return new Promise((resolve, reject) => {
            db.getLinksCollection() // get page collection
                .then((collection) => { return collection.findOne(query); }) // execute find query
                .then((result) => { resolve(result);})
                .catch( (err) => { reject(err); })
        })
    }

    save(data) {
        const self = this;
        let collection = null;

        return new Promise((resolve, reject) => {

            db.getLinksCollection()
                .then( (coll) => {
                    return new Promise((res, rej) => {  collection = coll; res({}); })
                })
                .then( () => { return collection.replaceOne({ 'url' : data.url }, data, { 'upsert': true }) })
                .then( (result) => { resolve(result); })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}

module.exports = MemberPersistence;