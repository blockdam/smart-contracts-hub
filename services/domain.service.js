'use strict';

const Promise = require('bluebird');
const logger = require('./logger.service');
const HashService = require('./hash.service');
const PotService = require('./pot.service');
const DomainPersistence = require('../persistences/domain.persistence');
const config = require('../config/index');


class DomainService {

    constructor() {

        this.hashService = new HashService();
        this.potService = new PotService();
        this.domainPersistence = new DomainPersistence();
    }

    async get(colonyClient,domainId,token) {

        let self = this;

        let t = await colonyClient.getDomain.call({ domainId });

        if (t.potId != null) {
            t.balance = await this.potService.getBalance(colonyClient,t.potId,token);
        }

        t = Object.assign(t, await self.domainPersistence.findOne(domainId));

        return t;
    }
}

module.exports = DomainService;