'use strict';

const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');

const ecp = require('../helpers/ecp');

class HashService {

    constructor() {}

    async create(specification) {

        // Initialise the Extended Colony Protocol
        await ecp.init();

        // Create a specification hash for the task
        const specificationHash = await ecp.saveHash(specification);

        // Stop the Extended Colony Protocol
        await ecp.stop();

        return specificationHash;
    }


    async get(specification) {

        // Initialise the Extended Colony Protocol
        await ecp.init();
        // Create a specification hash for the task
        const specificationHash = await ecp.getHash(specification);
        // Stop the Extended Colony Protocol
        await ecp.stop();
        return specificationHash;
    }
}

module.exports = HashService;