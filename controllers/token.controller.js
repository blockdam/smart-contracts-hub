'use strict';

// let FacebookService = require('../services/facebook'),
//     MappingService = require('../services/mapping');

const tokenCtrl = () => {

    // let facebookService = FacebookService();
    // let mappingService = MappingService();

    return {

        handleGetCall: (req, res) => {

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

        },

        recordState: (req, res) => {

            // fire with cron job
            // get Events (since blocknr)
            // filter new
            // store in mongo

        }

    }

}

module.exports = tokenCtrl;

