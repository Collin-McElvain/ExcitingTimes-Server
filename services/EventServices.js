const Event = require('../models/EventSchema');
const User = require('../models/UserSchema');

module.exports = {

    getall (req, res) {
        //Retrieve all events based on user
        User.findOne({username: req.query.username}, (err, thisUser) => {
            if(err){
                res.status(400).send('error');
            }
            if(!thisUser){
                res.status(400).send('no user by that username');
            }
            else {
                //Run mongoose find command on mongodb
                Event.find({user: thisUser._id}, (err, events) => {
                    if(err){
                        res.send(err);
                    }
                    if(!events){
                        res.send("No Events");
                    }
                    else {
                        res.send(events);
                    }
                });
            }
        });
    },

    createEvent (req, res) {
        //Make sure there is a user associated
        User.findOne({username: req.body.username}, (err, thisUser) => {
            if(err){
                res.status(400).send('error');
            }
            if(!thisUser){
                res.status(400).send('No user by that username');
            }
            else{
                //Create a new event with this user
                let newEvent = new Event({
                    name: req.body.name,
                    date: req.body.date,
                    user: thisUser._id
                });
                newEvent.save(function(err, event){
                    if(err) {
                        res.status(400).send(err);
                    }
                    else {
                        res.send(event);
                    }
                });
            }
        });
        

        
    },

    deleteEvent (req, res) {
        Event.deleteOne({_id: req.body.id}, (err) => {
            if(err){
                res.status(400).send(err);
            }
            else {
                res.send("Successfully deleted");
            }
        });
    },

    editEvent (req, res) {
        Event.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err) => {
            if(err){
                res.status(400).send(err);
            }
            else {
                res.send("Successfully edited");
            }
        });
    },
};