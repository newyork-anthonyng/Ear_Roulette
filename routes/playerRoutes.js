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
  let title  = req.body.title;
  let artist = req.body.artist;
  let name   = req.body.user;

  let mySong = { title: title, artist: artist };

  // get current user and add current song
  User.findOneAndUpdate(
    { name: name },
    { $push: { favorites: mySong } }, (err, user) => {
      if(err) throw err;

      console.log('Song saved.');
    }
  );

  // get user's favorite songs
  User.findOne({ name: name }, (err, user) => {
    if(err) throw err;

    res.send(user.favorites);
  });
});

router.post('/dislike', (req, res) => {
  let title  = req.body.title;
  let artist = req.body.artist;
  let name   = req.body.user;

  let mySong = { title: title, artist: artist };

  // get current user and remove song from favorites
  User.findOneAndUpdate(
    { name: name },
    { $pull: { favorites: { $and: [ { title: title }, { artist: artist } ] } } }, (err, user) => {
      if(err) throw err;

      console.log('Song removed.');
    }
  );

  // get user's favorite songs
  User.findOne({ name: name }, (err, user) => {
    if(err) throw err;

    res.send(user.favorites);
  });

});

// saves all tracks into array
router.get('/updateTracks', (req, res) => {
  let data = req.query['data'];
  let dataArray = [];

  // transform 'data' into a shuffled array of objects
  for(let track in data) {
    dataArray.push(data[track]);
  }

  dataArray = shuffle(dataArray);

  // go through each track and update myTracks with previewURL
  for(let i = 0, j = dataArray.length; i < j; i++) {
    myTracks.push(dataArray[i]['preview']);
    myTracksInformation.push(dataArray[i]);
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
  if(player) player.pause();

  res.status(200).send();
});

router.get('/stop', (req, res) => {
  if(player) player.stop();

  res.status(200).send();
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

// shuffle an array
let shuffle = function(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

module.exports = router;
