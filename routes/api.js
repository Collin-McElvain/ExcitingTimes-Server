const express = require('express'),
    router = express.Router(),
    UserService = require('../services/UserServices'),
    EventService = require('../services/EventServices');


//Log all calls to the server in console.
router.use(function(req, res, next){
    console.log(req.method, req.url);

    next();
});

router.get('/', function(req, res) {
    res.send('homepage');

});


// POST call for user login
router.post("/login", UserService.login);

// POST call for registering user
router.post("/createUser", UserService.createUser);

// DELETE call to delete a user, this will also delte their events
router.delete("/deleteUser", UserService.deleteUser);



// GET call to get all of a users events
router.get("/events", EventService.getall);

// POST call to create a new event
router.post("/event", EventService.createEvent);

// POST call to delete an event
router.post("/deleteEvent", EventService.deleteEvent);

module.exports = router;