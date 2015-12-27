'use strict'

const express  = require('express');
const app      = express();
const router   = express.Router();
const User     = require('../models/user');
const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
const config   = require('../config');
const Utility  = require('./_utility');

app.set('secret', config.secret);

// *** API Routes *** //
router.post('/new', saveNewUser);
router.post('/authenticate', authenticateUser);
router.post('/like', likeSong);
router.post('/dislike', dislikeSong);
router.get('/favorites', getFavoriteSongs);     // requires 'username' in query


function saveNewUser(req, res) {
  let name     = req.body.name;
  let password = req.body.password;

  let myUser = new User({
    name:     name,
    password: password
  });

  myUser.save((err) => {
    if(err) {
      res.status(401).send({ SUCCESS: false, MESSAGE: 'User not saved' });
      return;
    } else {
      res.json({
        SUCCESS:  true,
        MESSAGE:  'User saved successfully',
        name:     name,
        password: password
      });
    }
  });
};

function authenticateUser(req, res) {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if(err) throw err;

    // user doesn't exist in our database
    if(!user) {
      res.status(401).send({
        SUCCESS: false,
        MESSAGE: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(err) throw err;

        if(isMatch) {
          let token = jwt.sign(user, app.get('secret'), { expiresIn: 3600 });

          res.json({
            user:    user,
            SUCCESS: true,
            MESSAGE: 'Enjoy your token.',
            token:   token
          });
        } else {
          res.status(401).send({
            SUCCESS: false,
            MESSAGE: 'Authentication failed. Wrong password.'
          });
        }
      });  // end of user.comparePassword()
    }  // end of if(!user)
  });  // end of User.findOne()
};

function likeSong(req, res) {
  let trackTitle  = req.body.trackTitle;
  let trackArtist = req.body.trackArtist;
  let username    = req.body.username;

  let mySong = {
    trackTitle:  trackTitle,
    trackArtist: trackArtist
  };

  User.findOneAndUpdate(
    { name: username },
    { $push: { favorites: mySong } }, (err, user) => {
      if(err) throw err;

      res.json({
        SUCCESS:     true,
        MESSAGE:     'Song saved',
        username:    username,
        trackTitle:  trackTitle,
        trackArtist: trackArtist
      });
    }
  );
};

function dislikeSong(req, res) {
  let trackTitle  = req.body.trackTitle;
  let trackArtist = req.body.trackArtist;
  let username    = req.body.username;

  let mySong = {
    trackTitle:  trackTitle,
    trackArtist: trackArtist
  };

  // find song by its title and artist, and remove it
  User.findOneAndUpdate(
    { name: username },
    { $pull: {favorites: { $and: [ { trackTitle: trackTitle },
                         { trackArtist: trackArtist } ] }} }, (err, user) => {

      if(err) throw err;
    }
  );  // end of User.findOneAndUpdate()

  sendFavoriteSongs(username, res);
};

function getFavoriteSongs(req, res) {
  // parse query string for username
  let username = Utility.parseQueryString(req.originalUrl)['username'];

  // check if username is provided
  if(username == undefined) {
    res.json({ SUCCESS: false, MESSAGE: 'Missing username' });
    return;
  }

  sendFavoriteSongs(username, res);
};


function sendFavoriteSongs(username, response) {
  User.findOne({ name: username }, (err, user) => {
    if(err) throw err;

    response.json({
      SUCCESS: true,
      tracks:  user.favorites
    });

    return;
  });
};

module.exports = router;
