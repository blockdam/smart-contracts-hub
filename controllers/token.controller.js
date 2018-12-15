'use strict';

let eth = require('../connectors/ethereum.connector');
// let FacebookService = require('../services/facebook'),
//     MappingService = require('../services/mapping');

class TokenController {


    constructor () {

        // let facebookService = FacebookService();
        // let mappingService = MappingService();
    }

    recordState() {

        // fire with cron job
        // get new  Events (since blocknr)
        // store in mongo

        console.log('web3');

        let web3 = eth.get('rinkeby'); // get page collection


        console.log(web3);
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

