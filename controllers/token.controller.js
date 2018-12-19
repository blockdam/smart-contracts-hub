'use strict';

const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('../services/logger.service');
const TokenService = require('../services/token.service');
const EventDefinition = require('../definitions/event.definition');
const EventPersistence = require('../persistences/event.persistence');
const config = require('../config');
const fs = require('graceful-fs');
const WebSocket = require('ws');

class TokenController {


    constructor () {

        this.tokenService = new TokenService();
        this.eventPersistence = new EventPersistence();
        this.eventDefinition = new EventDefinition();
        this.tokenAbi = JSON.parse(fs.readFileSync('/opt/smart-contract-hub/abi/bcdToken.json')).abi;
        this.wss = null;

        // this.startWs();

    }

    startWs () {

        // this.wss = new WebSocket.Server({ port: 8080 });

        // wss.on('connection', function connection(ws) {
        //     ws.on('message', function incoming(message) {
        //         console.log('received: %s', message);
        //     });
        //
        //     ws.send('something');
        // });
    }

    init() {

        let self = this;

        return new Promise((resolve, reject) => {

            eth.get('rinkeby').then( (web3) => {

                self.web3 = web3;
                self.tokenContract = new web3.eth.Contract(self.tokenAbi,config.addresses.bcdToken);
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
            address: config.addresses.bcdToken
        };

        let subscription = self.web3.eth.subscribe('logs', options, function (error, result) {

            console.log('listening to ' + config.addresses.bcdToken);
        })
        .on("data", function (log) {
            console.log(log);
            // self.web3.eth.getTransaction(transactionHash)
            //     .then(function (transaction) {
            //         console.log(transaction);
            //     });
        });
    }

    getPastEvents() {

        let self = this;
        self.eventList = [];

        return new Promise((resolve, reject) => {

            self.tokenContract.getPastEvents("allEvents", {fromBlock: 0, toBlock: 'latest'}, function (err, data) {

                if (err) {
                    console.log(err)
                }
                if (data) {

                    let transfers = data.filter((e) => {
                        return e.event === 'Transfer'
                    });

                    logger.info(transfers.length);

                    Promise.each(transfers, (transfer, i) => {

                        return self._storeEvent(transfer);
                    })
                    .then(() => {
                        logger.info('saved all events');
                        resolve({});
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
                }
            });
        });
    }

    _storeEvent(event) {

        let self = this;

        self.tokenService.getBlockDate(self.web3,event.blockNumber)
            .then( (date) => {
                return new Promise((res, rej) => {  event.date = date; res({}); })
            })
            .then( () => {
                return self.eventDefinition.getMapping(event);
            })
            .then((mappedData) => {
                return self.eventPersistence.save(mappedData)
            })
            .catch(error => {
                logger.error(error);
            });
    }

    getEvents(req, res) {

        let self = this;

        let options = {
            query : {}
        };

        self.eventPersistence.find(options)
        .then( (results) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(results));
        });

    }

    getBalanceHistory(req, res) {

        let self = this,
            history = null;

        let options = {
            query : {
            }
        };

        self.eventPersistence.find(options)
            .then( (results) => {

                history = self.tokenService.calcBalanceHistory(results);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(history));

            })
            .catch( (err) =>{
                res.status(500).send(JSON.stringify(err));
            });

    }

    getTransactions(req, res) {

        let self = this,
            options = {
                query : {
                    $and: [
                        { 'to': { $ne: '0x0000000000000000000000000000000000000000' } },
                        { 'from': { $ne: '0x0000000000000000000000000000000000000000'} }
                    ]
                }
            };

        self.eventPersistence.find(options)
            .then( (results) => {

                res.status(200).send(JSON.stringify(results));
            });

    }

    sync(req,res){

        let self = this;

        self.getPastEvents()
            .then( (results) => {

                res.status(200).send('check');
            })
            .catch( (err) => {

                res.status(400);
            });

    }


}

module.exports = TokenController;

