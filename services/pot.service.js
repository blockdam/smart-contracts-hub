'use strict';

const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');
const BN = require('bn.js');



class PotService {

    constructor() {

    }

    async getBalance(colonyClient,potId,token) {

        let b = await colonyClient.getFundingPotBalance.call({ potId, token });

        return await new BN(b.balance._bn).toString();

    }
}

module.exports = PotService;