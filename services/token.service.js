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

            transfers.forEach((transfer,i) => {

                // we don't want a gradual line between two balance records in time .. so we make a stub with previous values just before the chnage
                if (i > 0) {
                    let prevBalance = {};
                    prevBalance.date  = moment(transfer.date).subtract(1, 's');
                    prevBalance.totalGrants = totalGrants;

                    history.push(prevBalance);
                }

                let balance = {};
                balance.date = transfer.date;
                balance.granted = 0;
                balance.sold = 0;

                if (transfer.from === '0x0000000000000000000000000000000000000000') {

                    balance.granted = transfer.value / config.bcdRatio;

                } else if (transfer.to === '0x0000000000000000000000000000000000000000') {

                    balance.sold = transfer.value / config.bcdRatio;
                }

                totalGrants = totalGrants - balance.sold + balance.granted;
                balance.totalGrants = totalGrants;

                history.push(balance);
            });

            let currentBalance = {};
            currentBalance.date  = moment();
            currentBalance.totalGrants = totalGrants;
            history.push(currentBalance);

            return history;
    }

    calcCirculation(transfers) {

        let circulation = [],
            week = {},
            weekValue;

        transfers.sort((a, b) => a.date - b.date);

        var start = moment(transfers[0].date);
        var end = moment();

        logger.info(start);

        for (let w = start; w.isBefore(end); w.add(1, 'week')) {

            weekValue = 0;

            // let transfersWithinWeek = transfers.filter( (t) => {
            //     return moment(t.date) >= w && moment(t.date) < w.add(1, 'week');
            // });
            //
            // transfersWithinWeek.forEach ( (tww) => {
            //     weekValue = weekValue + parseInt(tww.value);
            // });

             week.date = w;  // w.add(1,'week')
             week.value = weekValue

            logger.info('once?');
            circulation.push(week);
        }



        return circulation;

    }

}


module.exports = TokenService;
