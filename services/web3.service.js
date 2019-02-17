'use strict';

const Promise = require('bluebird');
const logger = require('./logger.service');
const config = require('../config/index');

class Web3Service {
    constructor() {

        this.web3 = null;
    }

    init(web3) {

        const self = this;

        return new Promise((resolve, reject) => {

            if (self.web3 === null) {

                eth.get('rinkeby').then((web3) => {

                    self.web3 = web3;
                    resolve();
                });


            } else {

                self.web3 = web3;
                resolve();
            }
        });
    }
}

module.exports = Web3Service;