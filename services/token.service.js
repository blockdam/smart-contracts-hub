'use strict';

const fs = require('graceful-fs');
const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');

/**
 * Service for getting dataset for visualization from the post sections and saving the dataset in a separate file so it can be loaded on the static pages
 */
class TokenService {

    constructor() {}


    getBlockDate(web3,blockNumber) {

        return new Promise((res, rej) => {

            web3.eth.getBlock(blockNumber, function (err, data) {
                if (err) {
                    console.log(err)
                    rej(err)
                }
                if (data) {

                    let date = new Date(data.timestamp * 1000);
                    res(date);
                }
            });
        });
    }

    getEvents() {



    }

}


module.exports = TokenService;
