'use strict';

const express = require('express');
const TokenCtrl = require('../controllers/token.controller');
const router = express.Router();


let tokenCtrl = new TokenCtrl();

tokenCtrl.init();

let getEvents = tokenCtrl.getEvents.bind(tokenCtrl);
let sync = tokenCtrl.sync.bind(tokenCtrl);
let getBalanceHistory = tokenCtrl.getBalanceHistory.bind(tokenCtrl);
let getTransactions = tokenCtrl.getTransactions.bind(tokenCtrl);
let getCirculation = tokenCtrl.getCirculation.bind(tokenCtrl);

router.route('/events')
    .get(getEvents);

router.route('/sync')
    .get(sync);

router.route('/balance')
    .get(getBalanceHistory);

router.route('/circulation')
    .get(getCirculation);

router.route('/transactions')
    .get(getTransactions);


module.exports = router;
