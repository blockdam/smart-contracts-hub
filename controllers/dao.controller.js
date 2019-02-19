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

            self.minterPersistence.isMinter(permissions).then( permissions => {

                return self.voucherPersistence.getVoucherCount(permissions);

            }).then( permissions => {

                res.json(permissions);
                res.status(200);
            });
        }

        handleMintCall(req,res,next) {

            let self = this,
                ethAddress = req.body.ethAddress,
                vouchers = req.body.vouchers;

            self.voucherPersistence.mint(ethAddress, vouchers).then((result) => {

                res.json(result);
                res.status(200);
            });
        }



        eligibleVoters() {


        }
}

module.exports = DaoController;

