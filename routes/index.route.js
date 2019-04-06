'use strict';

let express = require('express'),
    daoRoutes = require('./dao.route'),
    colonyRoutes = require('./colony.route'),
    tokenRoutes = require('./token.route'),
    membersRoutes = require('./members.route'),
    readingListRoutes = require('./readingList.route');

const router = express.Router();

router.use('/colony', colonyRoutes);
router.use('/dao', daoRoutes);
router.use('/token', tokenRoutes);
router.use('/members', membersRoutes);
router.use('/reading-list',readingListRoutes)

module.exports = router;