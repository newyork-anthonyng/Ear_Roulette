'use strict'

let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let userSchema = new Schema({
  name:     {type: String, required: true, unique: true},
  password: {type: String, required: true}

  favorites: {
    title:  String,
    artist: String
  }
});

let User = mongoose.model('User', userSchema);
module.exports = User;
