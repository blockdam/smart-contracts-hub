'use strict';

const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('../services/logger.service');
// const TokenService = require('../services/token.service');
// const EventDefinition = require('../definitions/event.definition');
// const EventPersistence = require('../persistences/event.persistence');
const config = require('../config');
const fs = require('graceful-fs');

class ReadingListController {

    constructor () {

        // this.tokenService = new TokenService();
        // this.eventPersistence = new EventPersistence();
        // this.eventDefinition = new EventDefinition();
        this.tokenAbi = JSON.parse(fs.readFileSync('/opt/smart-contract-hub/abi/ReadingList.json')).abi;
        this.latestSyncedBlock = config.latestSyncedBlock;
        this.web3 = null;
    }

    init() {

        let self = this;
        return new Promise((resolve, reject) => {
            eth.get('rinkeby').then( (web3) => {
                self.web3 = web3;
                self.contract = new web3.eth.Contract(self.tokenAbi,config.addresses.readingList);
                resolve();
            })
            .catch(error => {
                logger.error(error);
                reject(error);
            });
        });
    }

    subscribe() {

        let self = this;
        let options = {
            fromBlock: '0x0',
            address: config.addresses.readingList
        };


        let subscription = self.web3.eth.subscribe('logs', options, function (error, result) {
            if(error) {
                logger.info(error);
            } else {
                logger.info('listening to ' + config.addresses.bcdToken);
            }
        }).on("data", function (log) {
            console.log(log);
        });


        // let subscription = self.web3.eth.subscribe('logs', options, function (error, result) {
        //     logger.info("next");
        //     if(error) {
        //         logger.info(error);
        //     } else {
        //         logger.info('listening to ' + config.addresses.readingList);
        //     }
        // })
        // .on("data", function (log) {
        //     logger.info(log);
        // });
    }
}

module.exports = ReadingListController;