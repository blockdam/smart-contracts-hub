'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const db = require('../connectors/mongodb.connector');
const config = require('../config');
const moment = require('moment');


/**
 * Class takes care of all database operations for the page
 */
class VoucherPersistence {

    constructor() {

    }

    getVoucherCount(permissions) {
        
        let self = this,
            query = {
                'ethAddress': permissions.userAddress
            };

        return new Promise((resolve, reject) => {

            db.getVouchersCollection() // get page collection
                .then((collection) => { return collection.findOne(query); }) // execute find query
                .then((result) => {

                    if (result){
                        permissions.vouchers = result.vouchers;
                    } else {
                        permissions.vouchers = 0;
                    }
                    resolve(permissions);
                })
                .catch( (err) => { reject(err); })
        })
    }

    mint(address,amount) {

        return new Promise((resolve, reject) => {

            let data = {
                'ethAddress' : address,
                'vouchers' : amount
            }

            db.getVouchersCollection() // get page collection
                .then((collection) => { return collection.replaceOne({ 'ethAddress' : data.ethAddress }, data, { 'upsert': true }); }) }) // execute find query
                .then((result) => {
                    resolve();
                })
                .catch( (err) => { reject(err); })
        })

    }
}

module.exports = VoucherPersistence;