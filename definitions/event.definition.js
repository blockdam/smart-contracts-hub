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



            event.transactionHash = data.transactionHash;
            event.blockNumber = data.blockNumber;
            event.from = data.returnValues[0].from;
            event.to  = data.returnValues[0].to;
            event.value = data.returnValues[0].value;

            logger.info(event);

            const event = data;

            resolve(event);

        });
    }
}

module.exports = EventDefinition;