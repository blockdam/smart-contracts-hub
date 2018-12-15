const app = require('./express'),
    appConfig = require('./config/index'),
    TokenController = require('./controllers/token.controller'),
    cronJob = require('cron').CronJob;

// listen on port appConfig.port
app.listen(appConfig.port, () => {
    console.log('server started on port ' + appConfig.port);

    let tokenCtrl = new TokenController();

    let token = new cronJob('1 * * * * *', function(){
        console.log('checked with token');

        tokenCtrl.recordState();
    }, null, false);

    tokenCtrl.init();
    token.start();

});
