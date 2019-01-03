const app = require('./express'),
    appConfig = require('./config/index'),
    TokenController = require('./controllers/token.controller'),
    ReadingListController = require('./controllers/readingList.controller'),
    logger = require('./services/logger.service');

// listen on port appConfig.port
app.listen(appConfig.port, () => {
    console.log('server started on port ' + appConfig.port);

    let tokenCtrl = new TokenController();
    let readingListCtrl = new ReadingListController();

    tokenCtrl.init().then( () => {
         tokenCtrl.subscribe();
       // tokenCtrl.getPastEvents();
    })
    .catch(error => {
        logger.error(error);
    });

    readingListCtrl.init().then( () => {
        readingListCtrl.subscribe();
    })
    .catch(error => {
        logger.error(error);
    });


});
