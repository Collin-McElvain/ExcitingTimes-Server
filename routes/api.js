const express = require('express'),
    router = express.Router(),
    UserService = require('../services/UserServices'),
    EventService = require('../services/EventServices');

    router.use(function(req, res, next){
        console.log(req.method, req.url);
    
        next();
    });

router.get('/', function(req, res) {
    res.send('homepage');

});


router.post("/login", UserService.login);

router.post("/createUser", UserService.createUser);

router.delete("/deleteUser", UserService.deleteUser);


router.get("/events", EventService.getall.bind(EventService));

router.post("/event", EventService.createEvent);

module.exports = router;