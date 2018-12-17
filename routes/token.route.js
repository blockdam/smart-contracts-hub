'use strict';

const express = require('express');
const TokenCtrl = require('../controllers/token.controller');
const router = express.Router();


let tokenCtrl = new TokenCtrl();
 // save instance of blog controller
let getEvents = tokenCtrl.getEvents.bind(tokenCtrl);
let getBalanceHistory = tokenCtrl.getBalanceHistory(tokenCtrl);
// bind blog controller context to this in save function
//     update = pageCtrl.handleUpdateCall.bind(pageCtrl), // bind blog controller context to this in update function
//     del = pageCtrl.handleDeleteCall.bind(pageCtrl), // bind blog controller context to this in update function
//     preview = pageCtrl.handlePreviewCall.bind(pageCtrl);

eventRoutes.route('/')
    .get(getEvents)
balanceRoutes.route('/')
    .get(getBalanceHistory)


router.use('/events',eventRoutes)
router.use('/balance',balanceRoutes)


module.exports = router;
