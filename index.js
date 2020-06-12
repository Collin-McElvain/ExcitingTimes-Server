// const { default: router } = require("../eventTracker/src/router");

const mongoose = require("mongoose"),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    port = 4000;
    



mongoose.connect('mongodb://127.0.0.1:27017/event-tracker', {useNewUrlParser: true}, function(err) {
    if(err) {
        throw err;
    }
    console.log('Database connection successful');
}); 

app.use(bodyParser.json());

const cors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};
//Prevent cors errors and allow access to localhost
 app.use(cors);

var route = require('./routes/api');
app.use('/api', route);

app.listen(port, function(){
    console.log('Event Tracker server listening on port ' + port);
});


