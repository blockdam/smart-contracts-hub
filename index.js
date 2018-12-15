const app = require('./express'),
    appConfig = require('./config/index'),
    TokenCtrl = require('./controllers/token.controller'),
    tokenCtrl = new TokenCtrl(),
    cronJob = require('cron').CronJob;

// listen on port appConfig.port
app.listen(appConfig.port, () => {
    console.log('server started on port ' + appConfig.port);

    let token = new cronJob('1 * * * * *', function(){
        console.log('checked with token');
        tokenCtrl.recordState();
    }, null, false);

token.start();

});
