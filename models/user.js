'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt');

let userSchema = new Schema({
  name:     { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // holds an array of Objects with key of "trackTitle" and "trackArtist"
  favorites: { type: Array, default: [] }
});

// must use "function()" instead of "() =>" to keep the scope of "this"
userSchema.pre('save', function(next) {
  let user = this;

  // only hash password when it has changed
  if(!user.isModified('password')) return next();

  // Salt the password
  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err);

      user.password = hash;
      next();
    });
  }); // end of bcrypt.genSalt()
});

userSchema.methods.comparePassword = function(password, cb) {
  // check if password, once encrypted, matches to the second argument
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if(err) return cb(err);

    cb(null, isMatch);
  });
};

let User = mongoose.model('User', userSchema);
module.exports = User;
