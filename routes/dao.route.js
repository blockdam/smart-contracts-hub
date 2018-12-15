'use strict';

let express = require('express'),
    daoCtrl = require('../controllers/dao.controller');

const router = express.Router();


const ctrl = daoCtrl(); // create instance of instagram controller

// CRUD routes
router.route('/')

    .get(ctrl.handleGetCall)
// .post(ctrl.getFeed)
// .put(update)
// .delete(del);

module.exports = router;
