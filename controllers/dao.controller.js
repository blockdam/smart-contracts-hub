'use strict';

const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('../services/logger.service');
const TokenService = require('../services/token.service');
const Web3Service = require('../services/web3.service');
const MinterPersistence = require('../persistences/minter.persistence');
const VoucherPersistence = require('../persistences/voucher.persistence');
const config = require('../config');
const fs = require('graceful-fs');


class DaoController {

        constructor() {

            this.minterPersistence = new MinterPersistence();
            this.voucherPersistence = new VoucherPersistence();
        }

        handlePermissionsCall(req,res,next) {

            let self = this,
                permissions = {};

            permissions.userAddress = req.body.userAddress;
            logger.info(permissions.userAddress);

            self.minterPersistence.isMinter(permissions).then( permissions => {

                return self.voucherPersistence.getVoucherCount(permissions);

            }).then( permissions => {

                res.json(permissions);
                res.status(200);
            });
        }


        hasVouchers(permissions) {

            return new Promise((res, rej) => {

                    res(permissions);
            });
        }

        eligibleVoters() {


        }
}

module.exports = DaoController;

