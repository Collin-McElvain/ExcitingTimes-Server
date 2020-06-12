const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {

    login (req, res) {
        User.findOne({username: req.body.username}, (err, resultUser) => {
            if(err){
                res.status(400).send('There was a DB error');
            }
            if(!resultUser){
                // Username is not found
                res.status(400).send("Your username or password is incorrect");
            }
            else {
                resultUser.comparePassword(req.body.password, function(err, isMatch){
                    if(err){
                        res.status(400).send('There was a DB error');
                    }
                    if(isMatch){
                        // Create a 2 hour token for the logged in user
                        let token = jwt.sign({ id: resultUser.id }, config.secret, { expiresIn: 7200 });
                        res.status(200).send({ auth: true, token: token, user: resultUser });
                    }
                    else{
                        // Incorrect password
                        res.status(400).send("Your username or password is incorrect");
                    }
                });
            }
        });
    },

    createUser (req, res) {
        User.findOne({username: req.body.username}, (err, resultUser) => {
            if(err){
                res.status(400).send('There was a problem creating the user.');
            }
            if(resultUser){
                res.status(400).send("This username is already taken");
            }
            else {
                var newUser = new User({ username: req.body.username, password: req.body.password });
                newUser.save(function(err, user) {
                    if(err) {
                        res.status(400).send('There was a DB error');
                    }
                    else {
                        // Create JSON web token that will expire in 2 hours
                        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 7200 }); 
                        res.status(200).send({ auth: true, token: token, user: user });
                    }
                });
            }
        });
    },

    deleteUser(req, res) {

    }
};