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

            logger.info(data);

            const event = data;

            resolve(event);

        });
    }
}

module.exports = EventDefinition;