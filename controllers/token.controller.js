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

    recordState() {

        let self = this;
        self.eventList = [];

        console.log(self.tokenContract);

        // let subscription = self.web3.eth.subscribe('logs', function (error, result) {
        //
        //     console.log(result);
        // })
            // .on("data", function (transactionHash) {
            //     console.log(transaction);
            //     self.web3.eth.getTransaction(transactionHash)
            //         .then(function (transaction) {
            //             console.log(transaction);
            //         });
            // })

        this.tokenContract.events.allEvents({fromBlock: 0, toBlock: 'latest'}, function (err, data) {

            console.log('4');
            if (err) {
                console.log(err)
            }
            if (data) {

                console.log('1');
                self.eventList.push(data);
            }
        });

            // setTimeout( function() {
            //
            //     let saveData = null;
            //
            //     console.log('2');
            //
            //     self.eventList.forEach( (event) => {
            //
            //         logger.info('ko');
            //
            //         self.eventDefinition.getMapping(event)
            //         .then((mappedData) => {
            //             return new Promise((res, rej) => { saveData = mappedData; res({}); })
            //         })
            //         .then(() => { return self.eventPersistence.save(saveData) })
            //         .catch(error => {
            //             logger.error(error);
            //         });
            //
            //
            //     })
            //
            //
            // },15000);
    }

    handleGetCall(req, res) {

        // if (req.body) {
        //
        //     let feed = req.body;
        //
        //     switch (feed.type) {
        //         case 'facebook':
        //             facebookService.getFeed(feed)
        //                 .then(response => {
        //                     let socials = response.data;
        //                     let mappedArray = [];
        //                     for (let i in socials) {
        //                         let social = socials[i];
        //                         let mappedSocial = mappingService.mapFacebookSocial(social);
        //                         mappedArray.push(mappedSocial);
        //                     }
        //                     console.log(mappedArray);
        //
        //                     res.send(mappedArray)
        //                 })
        //                 .catch(function(error) {
        //                     console.log(error);
        //                     if(error.response.error.code === 'ETIMEDOUT') {
        //                         console.log('request timeout');
        //                     } else {
        //                         res.status(500).send(error);
        //                     }
        //                 });
        //             break;
        //         case 'instagram':
        //             console.log('insta');
        //             break;
        //         case 'twitter':
        //             console.log('twitter');
        //     }
        // } else {
        //     res.status(500).send('No feeds found');
        // }

        res.status(200).send('werkt');

    }


}

module.exports = TokenController;

