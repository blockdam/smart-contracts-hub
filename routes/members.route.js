'use strict';

let express = require('express'),
    MemberController = require('../controllers/member.controller');

const router = express.Router();


const memberController = new MemberController(); // create instance of instagram

let getAll = memberController.getAll.bind(memberController);
let findOne = memberController.findOne.bind(memberController);

// CRUD routes

router.route('')
    .get(getAll)

router.route('/:id')
    .get(findOne)
// .post(ctrl.getFeed)
// .put(update)
// .delete(del);

module.exports = router;
