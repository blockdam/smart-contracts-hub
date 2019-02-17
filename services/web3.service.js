'use strict';

const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');

class Web3Service {
    constructor() {}

    init(web3) {

        self.web3 = web3;
    }
}

module.exports = Web3Service;