const app = require('./express'),
    appConfig = require('./config/index'),
    TokenController = require('./controllers/token.controller'),
    ReadingListController = require('./controllers/readingList.controller'),
    EthereumController = require('./controllers/ethereum.controller'),
    logger = require('./services/logger.service');

// listen on port appConfig.port
app.listen(appConfig.port, () => {
    console.log('server started on port ' + appConfig.port);

    let tokenCtrl = new TokenController();
    let readingListCtrl = new ReadingListController();
    let ethereumCtrl = new EthereumController();

    tokenCtrl.init().then( () => {
         // tokenCtrl.subscribe();
        // tokenCtrl.getPastEvents(appConfig.latestSyncedBlock);
    })
    .catch(error => {
        logger.error(error);
    });

    readingListCtrl.init().then( () => {
        // readingListCtrl.subscribe();
    })
    .catch(error => {
        logger.error(error);
    });

    ethereumCtrl.init();


});
