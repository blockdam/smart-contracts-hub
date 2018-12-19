'use strict';

let express = require('express'),
    memberCtrl = require('../controllers/member.controller');

const router = express.Router();


const ctrl = new memberCtrl(); // create instance of instagram controller

// CRUD routes

router.route('')
    .get(ctrl.getAll)

router.route('/:id')
    .get(ctrl.findOne)
// .post(ctrl.getFeed)
// .put(update)
// .delete(del);

module.exports = router;
