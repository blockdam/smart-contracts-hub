'use strict';

const express = require('express');
const TokenCtrl = require('../controllers/token.controller');
const router = express.Router();


let tokenCtrl = new TokenCtrl();

let getEvents = tokenCtrl.getEvents.bind(tokenCtrl);
let getBalanceHistory = tokenCtrl.getBalanceHistory(tokenCtrl);


router.route('/events')
    .get(getEvents);

// router.route('/balance')
//     .get(getBalanceHistory);


module.exports = router;
