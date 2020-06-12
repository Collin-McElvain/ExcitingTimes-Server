var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_FACTOR = 7;

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: {unique: true} },
    password: { type: String, required: true }
},{
    timestamps:true
});

UserSchema.pre('save', function(next) {
    var user = this;
    console.log('this is fucking dumb');
    //Check for updated password
    if(!user.isModified('password')) {
        //return the callback function
        return next();
    }

    //Salt password and hash with bcrypt (recommended method by mongoose)
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if(err) {
            return next(err);
        }

        //Hash with salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
                return next(err);
            }

            //Change password with reference to db object
            user.password = hash;
            next();
        });
    });
});

//On user deletion, delete all events
UserSchema.pre('remove', function(next) {
    this.model('EventModel').deleteMany({ user: this._id }, next);
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, passMatch){
        if(err){
            return cb(err);
        }
        cb(null, passMatch);
    });
};

module.exports = mongoose.model('UserModel', UserSchema, 'User' );