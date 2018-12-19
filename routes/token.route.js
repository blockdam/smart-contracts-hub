'use strict';

const express = require('express');
const TokenCtrl = require('../controllers/token.controller');
const router = express.Router();


let tokenCtrl = new TokenCtrl();

let getEvents = tokenCtrl.getEvents.bind(tokenCtrl);
let getPastEvents = tokenCtrl.getPastEvents.bind(tokenCtrl);
let getBalanceHistory = tokenCtrl.getBalanceHistory.bind(tokenCtrl);
let getTransactions = tokenCtrl.getTransactions.bind(tokenCtrl);


router.route('/events')
    .get(getEvents);

router.route('/sync')
    .get(getPastEvents);

router.route('/balance')
    .get(getBalanceHistory);

router.route('/transactions')
    .get(getTransactions);


module.exports = router;
