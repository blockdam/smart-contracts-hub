'use strict';

const Promise = require('bluebird');
const logger = require('../services/logger.service');
const db = require('../connectors/mongodb.connector');
const config = require('../config');
const moment = require('moment');

class EventDefinition {

    constructor() {

    }

    getMapping(data) {

        return new Promise((resolve, reject) => {

            let event = {};

            event._id = data.transactionHash;
            event.transactionHash = data.transactionHash;
            event.date = data.date;
            event.blockNumber = data.blockNumber;
            event.from = data.returnValues.from;
            event.to  = data.returnValues.to;
            event.value = data.returnValues.value;

            resolve(event);

        });
    }
}

module.exports = EventDefinition;