'use strict'

const express = require('express');
const router  = express.Router();
const Player  = require('player');
const User    = require('../models/user');
// myTracks will hold all previewURLs
let myTracks            = [];
// myTracksInformation will hold 'title' and 'artist'
let myTracksInformation = [];
let player              = undefined;
let currentTrack        = 0;

router.get('/', (req, res) => {
  res.json({ success: true, message: 'get player/' });
});

router.post('/like', (req, res) => {
  // create a new liked song
  let title = req.body.title ;
  let artist = req.body.artist ;
  let name = req.body.user;

  console.log('inside of /like -- name: ' + name);

  let mySong = { title: title, artist: artist };

  // grab the current user
  console.log()
  User.findOneAndUpdate(
    { name: name },
    { $push: { favorites: mySong } }, (err, user) => {
      console.log('callback inside findOneAndUpdate: ' + user.name);
    }
  );

  User.findOne({ name: name }, (err, user) => {
    console.log('user name: ' + user.name);
    // console.log('user favorites: ' + user.favorites);
    for(let i = 0, j = user.favorites.length; i < j; i++) {
      console.log(user.favorites[i]);
    }
  });

  res.send(mySong);
});

// saves all tracks into array
router.get('/updateTracks', (req, res) => {
  let data = req.query['data'];

  // go through each track and update myTracks with previewURL
  for(let track in data) {
    myTracks.push(data[track]['preview']);
    myTracksInformation.push(data[track]);
  }

  res.json({ success: true, tracks: myTracks });
});

router.get('/play', (req, res) => {
  // if player doesn't exist, then create one
  if(!player) {
    console.log('Playing music.');
    player = createPlayer(player, myTracks);
  } else {
    console.log('Hit play/pause.');
    player.pause();
  }

  res.json({ success: true, player: player });
});

router.get('/pause', (req, res) => {
  console.log('player: ' + player);
  if(player) player.pause();

  res.status(200).send()
});

// return the current song information
router.get('/currentSong', (req, res) => {
  res.send(myTracksInformation[currentTrack]);
});


// create a new player with a song list
// attach an error handler to it
let createPlayer = function(player, songList) {
  if(player) player.stop();

  player = new Player(songList[currentTrack]);
  player.play();

  player.on('error', (song) => {
    player.stop();
    currentTrack += 1;
    console.log('on error: song ended');
    player = createPlayer(player, songList)
  });

  return player;
};

module.exports = router;
