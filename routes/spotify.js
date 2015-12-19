'use strict'

const express    = require('express');
const router     = express.Router();
const request    = require('request');
const bodyParser = require('body-parser');
const Utility    = require('./_utility');

router.get('/', (req, res) => {
  res.json({ SUCCESS: true });
});

// *** API Routes *** //
router.get('/artist', findArtistId);  // requires 'artistName' in query
router.get('/albums', findAlbums);    // requires 'artistId' in query
router.get('/tracks', findTracks);    // requires 'albumId' in query


function findArtistId(req, res) {
  // parse query string for artistName
  let artistName = Utility.parseQueryString(req.originalUrl);

  // check if artistName is provided
  if(artistName['artistName'] == undefined) {
    res.json({ SUCCESS: false, MESSAGE: 'Missing artist name' });
    return false;
  }

  // format artist name to replace spaces with '+'
  let formattedName = artistName['artistName'].split(' ').join('+');

  let myURL = 'https://api.spotify.com/v1/search?q=' + formattedName +
              '&type=artist&limit=1';

  request(myURL, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      let jsonData = JSON.parse(body)['artists']['items'][0];
      let artistID;
      let artistName;

      // check if we received information from Spotify
      if(jsonData) {
        artistID =   jsonData['id'];
        artistName = jsonData['name'];
      } else {
        res.json({ SUCCESS: false, MESSAGE: 'No artist ID found' });
        return false;
      }

      let data = {
        SUCCESS:    true,
        artistId:   artistID,
        artistName: artistName
      };

      res.json(data);
    }
  });
};

function findAlbums(req, res) {
  // parse query string for artistId
  let artistID = Utility.parseQueryString(req.originalUrl);

  // check if artistId is provided
  if(artistId['artistId'] == undefined) {
    res.json({ SUCCESS: false, MESSAGE: 'Missing artist ID' });
    return false;
  }

  let myUrl = 'https://api.spotify.com/v1/artists/' + artistID['artistId'] +
              '/albums?limit=3';

  request(myUrl, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      let jsonData = JSON.parse(body)['items'];
      let myAlbums = [];

      for(let i = 0, j = jsonData.length; i < j; i++) {
        let newAlbum = {
          albumId:    jsonData[i]['id'],
          albumName:  jsonData[i]['name'],
          albumImage: jsonData[i]['images'][1]['url']
        };

        myAlbums.push(newAlbum);
      }

      res.json({ SUCCESS: true, albums: myAlbums });
    }
  });
};

function findTracks(req, res) {
  // parse query string for albumId
  let albumId = Utility.parseQueryString(req.originalUrl);

  // check if albumId is provided
  if(albumId['albumId'] == undefined) {
    res.json({ SUCCESS: false, MESSAGE: 'Missing album ID' });
    return false;
  }

  let myURL = 'https://api.spotify.com/v1/albums/' + albumID['albumId'] +
              '/tracks?limit=5';

  request(myURL, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      let jsonData = JSON.parse(body)['items'];
      let myTracks = [];

      for(let i = 0, j = jsonData.length; i < j; i++) {
        let newTrack = {
          trackId:      jsonData[i]['id'],
          trackTitle:   jsonData[i]['name'],
          trackArtist:  jsonData[i]['artists'][0]['name'],
          trackPreview: jsonData[i]['preview_url'],
        };

        myTracks.push(newTrack);
      }

      res.send({ SUCCESS: true, tracks: myTracks });
    }
  });
};

module.exports = router;
