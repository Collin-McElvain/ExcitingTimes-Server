var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
});

module.exports = mongoose.model('EventModel', EventSchema );