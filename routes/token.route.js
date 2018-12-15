'use strict';

let express = require('express'),
    tokenCtrl = require('../controllers/token.controller');

const router = express.Router();


const ctrl = new tokenCtrl(); // create instance of instagram controller

// CRUD routes
router.route('/')
    .get(ctrl.handleGetCall)
 //   .get(ctrl.getState)
// .put(update)
// .delete(del);

module.exports = router;
