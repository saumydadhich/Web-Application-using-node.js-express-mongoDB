var express = require('express');
var app = express();

app.use('/assets', express.static('./assets'));
app.set('view engine','ejs');

const session = require('express-session');
app.use(session({secret: 'session'}));

const userController = require('./routes/userController.js');
const connectionController = require('./routes/connectionController.js');
const controller = require('./routes/controller.js');

app.use('/userprofile',userController);
app.use('/connections',connectionController);
app.use('/',controller);

app.listen(8084,function(){
    console.log('server listening to port 8084');
});