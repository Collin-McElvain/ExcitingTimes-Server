const User = require('../models/UserSchema');

module.exports = {

    login (req, res) {
        User.findOne({username: req.body.username}, (err, resultUser) => {
            if(err){
                res.send(err);
            }
            if(!resultUser){
                res.status(400).send("ERROR: Login failed");
            }
            else {
                console.log(req.body);
                resultUser.comparePassword(req.body.password, function(err, isMatch){
                    if(err){
                        throw err;
                    }
                    if(isMatch){
                        res.json("success!");
                    }
                    else{
                        res.status(400).send("Password do not match");
                    }
                });
            }
        });
    },

    createUser (req, res) {
        User.findOne({username: req.body.username}, (err, resultUser) => {
            if(err){
                res.send(err);
            }
            if(resultUser){
                res.status(400).send("Username is taken");
            }
            else {
                var newUser = new User({ username: req.body.username, password: req.body.password });
                newUser.save(function(err, user) {
                    if(err) {
                        res.status(400).send(err);
                    }
                    else {
                        res.send("success!");
                    }
                })
            }
        });
    },

    deleteUser(req, res) {

    }
};