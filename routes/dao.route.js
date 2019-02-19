'use strict';

let express = require('express'),
    DaoCtrl = require('../controllers/dao.controller');

const router = express.Router();

const daoCtrl = new DaoCtrl();
const handlePermissionsCall = daoCtrl.handlePermissionsCall.bind(daoCtrl);
const handleMintCall = daoCtrl.handleMintCall.bind(daoCtrl);


router.route('/permissions')
    .post(handlePermissionsCall);

router.route('/mint')
    .post(handleMintCall);


module.exports = router;