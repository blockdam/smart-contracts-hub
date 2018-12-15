'use strict';

const eth = require('../connectors/ethereum.connector');
const logger = require('../services/logger.service');
const config = require('../config');
const fs = require('graceful-fs');

class TokenController {


    constructor () {

        this.tokenAbi = fs.readFileSync('/opt/smart-contract-hub/abi/bcdToken.json');
        this.web3 = eth.get('rinkeby');
        this.tokenContract = this.web3.eth.contract(this.tokenAbi).at(config.addresses.bcdToken);
    }

    recordState() {

        // fire with cron job
        // get new  Events (since blocknr)
        // store in mongo

        this.tokenContract.allEvents({fromBlock: 0, toBlock: 'latest'}, function (err, data) {
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

