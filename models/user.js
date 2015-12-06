'use strict'

let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let userSchema = new Schema({
  name:     { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Array will be an array of Objects with key of "title" and "artist"
  favorites: { type: Array, default: [] }
});

let User = mongoose.model('User', userSchema);
module.exports = User;
