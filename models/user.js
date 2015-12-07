'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt');

let userSchema = new Schema({
  name:     { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Array will be an array of Objects with key of "title" and "artist"
  favorites: { type: Array, default: [] }
});

userSchema.pre('save', (next) => {
  let user = this;

  // Has password if password has changed
  if(!user.isModified('password')) return next();

  // Salt the password
  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

let User = mongoose.model('User', userSchema);
module.exports = User;
