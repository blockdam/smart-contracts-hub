'use strict';

let express = require('express'),
    daoCtrl = require('../controllers/dao.controller');

const router = express.Router();

const daoCtrl = new daoCtrl();
const handlePermissionsCall = daoCtrl.handlePermissionsCall.bind(daoCtrl);


router.route('/permissions')
    .post(handlePermissionsCall)


module.exports = router;