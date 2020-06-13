const express = require('express'),
    router = express.Router(),
    UserService = require('../services/UserServices'),
    EventService = require('../services/EventServices'),
    jwt = require('jsonwebtoken'),
    config = require('../config');


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


// Check all tokens and validate on all requests that require authentication.
let authToken = function (req, res, next){
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(token){
        // verify the token
        jwt.verify(token, config.secret, function(err, verifiedToken){
            if (err){
                console.log("error");
                // token is not authenticated
                res.status(403).send({
                    success: false,
                    message: "Failed to authenticate",
                });
            } else {
                console.log("wtf");
                next();
            }
        });
    } else {
        // No token
        console.log("no token");
        res.status(403).send({
            success: false,
            message: "No token!",
        });
    }
};

// GET call to get all of a users events
router.get("/events", authToken, EventService.getall);

// POST call to create a new event
router.post("/event", authToken, EventService.createEvent);

// POST call to delete an event
router.post("/deleteEvent", authToken, EventService.deleteEvent);

module.exports = router;