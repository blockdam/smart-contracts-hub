const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('../services/logger.service');
const Web3Service = require('../services/web3.service');
const config = require('../config');
const WebSocket = require('ws');

const TokenController = require('./token.controller');
const ReadingListController = require('./readingList.controller');

class EthereumController {

    constructor () {

        this.latestSyncedBlock = config.latestSyncedBlock;
    }

    init() {

        let tokenCtrl = new TokenController();
        let readingListCtrl = new ReadingListController();
        let web3Service = new Web3Service();

        let self = this,
            subscription,
            options = {
                fromBlock: '0x0'
            };

        eth.get('rinkeby').then( (web3) => {

            web3Service.set(web3);

            subscription = web3.eth.subscribe('newBlockHeaders', options, function (error, result) {
                if(error) {
                    logger.info(error);
                } else {
                    logger.info('listening to rinkeby testnet');
                }
            })
            .on("data", function (newBlockHeader) {

                logger.info(newBlockHeader);
                // logger.info('notified of block ' + log.blockNumber);
                tokenCtrl.getPastEvents(web3,config.latestSyncedBlock);
            });
        });
    }
}


module.exports = EthereumController;