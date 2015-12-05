'use strict'

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const logger      = require('morgan');
const request     = require('request');
const mongoose    = require('mongoose');

const Player      = require('player');
const jwt         = require('jsonwebtoken');
const config      = require('./config');
const User        = require('./models/user');

// use Angular
app.use('/scripts', express.static(__dirname + '/node_modules/angular'));

// configuration
const port = 3000;
mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// Test route to set up a fake user
app.get('/setup', (req, res) => {
  let myUser = new User({
    name:     'Anthony',
    password: 'password'
  });

  myUser.save((err) => {
    if(err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

app.post('/authenticate', (req, res) => {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if(err) throw err;

    if(!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {

      if(user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        // user is authenticated
        let token = jwt.sign(user, app.get('secret'), { expiresIn: 3600 });

        // return the token information
        console.log('token: ' + token);
        res.json({
          success: true,
          message: 'Enjoy your token.',
          token:   token
        });
      }
    }
  })
});

// route middleware to verify token
// app.use((req, res, next) => {
//   let token = req.headers['x-access-token'];
//
//   if(token) {
//     jwt.verify(token, app.get('secret'), (err, decoded) => {
//
//       if(err) {
//         return res.json({
//             success: false,
//             message: 'Failed to authenticate token'
//         });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.'
//     });
//   }
// });

app.get('/', (req, res) => {
  res.json({ success: true });
});

// TODO: need to populate mongodb with list of artists
// get a list of artists from database
app.get('/artists', (req, res) => {
  let myArtists = ['matchbox twenty', 'killers'];

  res.send(myArtists);
});

// returns an object with an 'id' (which can be searched on Spotify) and 'name'
app.get('/artistID/:artistName', (req, res) => {
  let artistName    = req.params.artistName;
  let formattedName = artistName.split(' ').join('+');

  let myURL = 'https://api.spotify.com/v1/search?q=' +
              formattedName + '&type=artist&limit=1';

  request(myURL, (error, response, body) => {
    if(!error && response.statusCode == 200) {

      let jsonData = JSON.parse(body)['artists']['items'][0];
      let artistID = undefined;

      // check if we received information from Spotify
      if(jsonData) {
        artistID = jsonData['id'];
      } else {
        console.log(artistName + '\'s id was not found.');
      }

      let data     = {};
      data['id']   = artistID;
      data['name'] = artistName;

      res.send(data);
    }
  });
});

// returns an array of objects, with keys of 'id', 'name' and 'image'
app.get('/albums/:artistID', (req, res) => {
  let artistID = req.params.artistID;

  let myUrl = 'https://api.spotify.com/v1/artists/' +
            artistID + '/albums?limit=10';

  // hit spotify API
  request(myUrl, (error, response, body) => {
    if(!error && response.statusCode == 200) {

      // jsonData will hold an array of albums
      let jsonData = JSON.parse(body)['items'];

      // myAlbums will hold an array of objects
      // Object will hold 'id', 'name' and 'image'
      let myAlbums = [];

      for(let i = 0, j = jsonData.length; i < j; i++) {
        let newAlbum = {};

        newAlbum['id']    = jsonData[i]['id'];
        newAlbum['name']  = jsonData[i]['name'];
        newAlbum['image'] = jsonData[i]['images'][1]['url'];

        myAlbums.push(newAlbum);
      }

      res.send(myAlbums);
    }
  });
});

// returns an array of objects, with keys of 'id', 'title', 'artist' & 'preview'
app.get('/tracks/:albumID', (req, res) => {
  let albumID = req.params.albumID;

  let myURL = 'https://api.spotify.com/v1/albums/' +
              albumID + '/tracks?limit=10';

  request(myURL, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      let jsonData = JSON.parse(body)['items'];

      // myTracks will hold an array of objects
      // Object will hold 'id', 'title', 'artist' and 'preview'
      let myTracks = [];

      for(let i = 0, j = jsonData.length; i < j; i++) {
        let newTrack = {};

        newTrack['id']      = jsonData[i]['id'];
        newTrack['title']   = jsonData[i]['name'];
        newTrack['artist']  = jsonData[i]['artists'][0]['name'];
        newTrack['preview'] = jsonData[i]['preview_url'];

        myTracks.push(newTrack);
      }

      res.send(myTracks);
    }
  });

});

// myTracks will hold all previewURLs
let myTracks            = [];
// myTracksInformation will hold 'title' and 'artist'
let myTracksInformation = [];
let player              = undefined;
let currentTrack = 0;

// saves all tracks into array
app.get('/updateTracks', (req, res) => {
  let data = req.query['data'];

  // go through each track and update myTracks with previewURL
  for(let track in data) {
    myTracks.push(data[track]['preview']);
    myTracksInformation.push(data[track]);
  }

  res.status(200).send();
});

app.get('/play', (req, res) => {
  // if player doesn't exist, then create one
  if(!player) {
    console.log('Playing music.');
    player = createPlayer(player, myTracks);
  } else {
    console.log('Hit play/pause.');
    player.pause();
  }

  res.json({ success: true });
  // // if not, then play/pause
  // player = createPlayer(player, myTracks);

  // // send title and artist
  // let songInformation = {};
  // songInformation['title']  = myTracksInformation[currentTrack]['title'];
  // songInformation['artist'] = myTracksInformation[currentTrack]['artist'];
  //
  // res.send(songInformation);
});

app.get('/pause', (req, res) => {
  console.log('player: ' + player);
  if(player) player.pause();

  res.status(200).send()
});

// return the current song information
app.get('/currentSong', (req, res) => {
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
}

const server = app.listen(port, () => {
  console.log('Express server running...');
})
