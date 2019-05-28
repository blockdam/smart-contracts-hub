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



    // get mongoConfig

    tokenCtrl.getPastEvents(appConfig.latestSyncedBlock);

    eth.get('rinkeby').then( (web3) => {

        web3Service.set(web3);

        subscription = web3.eth.subscribe('newBlockHeaders', function (error, result) {
            if(error) {
                logger.info(error);
            }
        })
        .on("data", function(blockHeader){
            console.log('block: ' + blockHeader.number);
            tokenCtrl.getPastEvents(web3,blockHeader.number;
            // readingListCtrl.getList();
        })
        .on("error", console.error);
    });



    // tokenCtrl.init().then( () => {
    //     tokenCtrl.subscribe();
    //     tokenCtrl.getPastEvents(appConfig.latestSyncedBlock);
    //
    // })
    // .catch(error => {
    //     logger.error(error);
    // });

    // readingListCtrl.init().then( () => {
    //     // readingListCtrl.subscribe();
    // })
    // .catch(error => {
    //     logger.error(error);
    // });




});
