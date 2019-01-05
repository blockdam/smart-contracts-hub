'use strict';

const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('../services/logger.service');
const UrlMetaDataService = require('../services/url_metadata.service');
const LinkPersistence = require('../persistences/link.persistence');

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
        this.contract = null;
    }

    init() {

        let self = this;
        return new Promise((resolve, reject) => {
            eth.get('rinkeby').then( (web3) => {
                self.web3 = web3;
                self.contract = new self.web3.eth.Contract(self.tokenAbi,config.addresses.readingList);
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
            }
        }).on("data", function (log) {
            console.log(log);
            self.getList();
        });
    }

    getList() {

        let self = this,
            array = [];

        self.contract.methods.slotsCount().call( (err,noSlots) => {
            if(err) {
                console.log(err);
            }

            for (let i = 1; i <= noSlots;i++) {
                self.contract.methods.slots(i).call( (err,slot) => {
                    array.push(slot.linkId);
                    if(array.length > (noSlots - 1)) {
                        logger.info(array);
                    }
                });
            }
        });
    }

    async getMetaData(req, res) {

        let urlMetaDataService = new UrlMetaDataService();
        if(req.body.url) {
            let metaData = await urlMetaDataService.getMetaData(req.body.url);
            res.send(metaData);
        } else {
            res.send('You must specify a url');
        }
    }

    async store(req, res) {

        let self = this;
        let linkPersistence = new LinkPersistence();
        let savedObjectId = await linkPersistence.save(req.body.link);
        res.json(savedObjectId);
    }

    // async pay() {
    //
    //
    // }
}

module.exports = ReadingListController;