'use strict'

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const logger      = require('morgan');
const request     = require('request');
const Player      = require('player');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {

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
              albumID + '/tracks?limit=30';

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

// saves all tracks into array
app.get('/updateTracks', (req, res) => {
  let data = req.query['data'];

  // go through each track and update myTracks with previewURL
  for(let track in data) {
    myTracks.push(data[track]['preview']);
  }

  res.status(200).send();
});

// play music
app.get('/play', (req, res) => {
  
  if(!player) {
    player = new Player(myTracks);
    player.play();
  }

  res.status(200).send();
});

const server = app.listen(3000, () => {
  console.log('Express server running...');
})
