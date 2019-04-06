'use strict';

const Promise = require('bluebird');
const logger = require('./logger.service');
const HashService = require('./hash.service');
const PotService = require('./pot.service');
const config = require('../config/index');
const DomainPersistence = require('../persistences/domain.persistence');


class TaskService {

    constructor() {

        this.hashService = new HashService();
        this.potService =  new PotService();
        this.domainPersistence = new DomainPersistence();

    }

    async get(colonyClient,taskId,token) {

        let t = await colonyClient.getTask.call({ taskId });

        let ipfsRecord = {};

        if (t.specificationHash != null) {
            ipfsRecord = await this.hashService.get(t.specificationHash);
        }

        if (t.domainId != null) {

            t.domain = await this.domainPersistence.findOne(t.domainId);
        }

        if (t.potId != null) {

            t.balance = await this.potService.getBalance(colonyClient,t.potId,token)
        }

        return Object.assign(t,ipfsRecord);

    }

    async modify(colonyClient,taskId,taskData,token) {

        let task = self.get(colonyClient,taskId,token);

        if (taskData.title != task.title) {


        }
    }
}

module.exports = TaskService;