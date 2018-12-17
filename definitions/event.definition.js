'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const db = require('../connectors/mongodb.connector');
const config = require('../config');
const moment = require('moment');


/**
 * Class takes care of all database operations for the page
 */
class EventDefinition {

    constructor() {

    }

    getMapping(data) {

        return new Promise((resolve, reject) => {


            let event = {};

            event.transactionHash = data.transactionHash;
            event.blockNumber = data.blockNumber;
            event.from = data.returnValues;
            // event.to  = data.returnValues.Result.to;
            // event.value = data.returnValues.Result.value;

            logger.info(event);

            resolve(event);

        });
    }
}

module.exports = EventDefinition;