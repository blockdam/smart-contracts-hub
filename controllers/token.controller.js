'use strict';

const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('../services/logger.service');
const config = require('../config');
const fs = require('graceful-fs');
const WebSocket = require('ws');

class TokenController {


    constructor () {

        this.tokenAbi = JSON.parse(fs.readFileSync('/opt/smart-contract-hub/abi/bcdToken.json')).abi;

        this.startWs();

    }

    startWs () {

        const wss = new WebSocket.Server({ port: 3738 });

        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
            });

            ws.send('something');
        });
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

        // fire with cron job
        // get new  Events (since blocknr)
        // store in mongo

        // ho ho ..je kan aan events subscriben

        console.log('yo');

        this.tokenContract.events.allEvents({fromBlock: 0, toBlock: 'latest'}, function (err, data) {
            if (err) {
                console.log(err)
            }
            if (data) {

                logger.info(data);
            }
        });



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

