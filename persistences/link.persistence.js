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

    findOne() {
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

    findUrl(url) {
        let self = this,
            query = {};

        return new Promise((resolve, reject) => {
            db.getLinksCollection() // get page collection
                .then((collection) => { return collection.findOne({ url : url}); }) // execute find query
                .then((result) => { resolve(result);})
                .catch( (err) => { reject(err); })
        })
    }

    save(data) {
        let self = this;
        let collection = null;

        return new Promise((resolve, reject) => {

            db.getLinksCollection()
                .then( (coll) => {
                    return new Promise((res, rej) => {  collection = coll; res({}); })
                })
                .then( () => { return collection.replaceOne({ 'url' : data.url }, data, { 'upsert': true }) })
                .then( () => {
                    return self.findUrl(data.url)
                })
                .then( (item) => {
                    resolve(item._id);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}

module.exports = MemberPersistence;