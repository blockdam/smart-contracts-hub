'use strict';

const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('../services/logger.service');
const UrlMetaDataService = require('../services/url_metadata.service');

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
            }
        }).on("data", function (log) {
            self.getList(log.blockNumber);
            console.log(log);
        });
    }

    getList(fromBlock) {

        let options = {
            fromBlock: fromBlock,
            toBlock: 'latest'
        };

        let self = this;
        self.contract.getPastEvents("LinkAdded", options, function (err, data) {

            if (err) {
                console.log(err)
            }
            if (data) {
                console.log(data)
            }
        })
    }

    getMetaData(req, res) {




        let urlMetaDataService = new UrlMetaDataService();
        

        if(req.params.url) {
            urlMetaDataService.getMetaData(req.params.url)    // req.params.url
                .then((metaData) => {
                    res.json(metaData);
                })
                .catch( (error) => {
                    logger.info(error);
                });
        } else {

            res.send('You must specify a url');
        }
    }
}

module.exports = ReadingListController;