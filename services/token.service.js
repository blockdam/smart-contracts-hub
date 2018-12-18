'use strict';

const fs = require('graceful-fs');
const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');
const moment = require('moment');

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

    calcBalanceHistory(transfers) {

            let totalGrants = 0;
            let history = [];

            transfers.forEach((transfer) => {

                let prevBalance = {};
                prevBalance.date  = moment(transfer.date).subtract(1, 's');
                prevBalance.totalGrants = totalGrants;
                prevBalance.ethValue = 5 / totalGrants;

                history.push(prevBalance);

                let balance = {};
                balance.date = transfer.date;
                balance.granted = 0;
                balance.sold = 0;

                if (transfer.from === '0x0000000000000000000000000000000000000000') {

                    balance.granted = transfer.value / 1000000000000000000;

                } else if (transfer.to === '0x0000000000000000000000000000000000000000') {

                    balance.sold = transfer.value / 1000000000000000000;
                }

                totalGrants = totalGrants - balance.sold + balance.granted;
                balance.totalGrants = totalGrants;
                balance.ethValue = 5 / totalGrants;

                history.push(balance);
            });

            return history;
    }

}


module.exports = TokenService;
