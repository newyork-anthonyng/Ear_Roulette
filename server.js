'use strict'

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const logger      = require('morgan');
const request     = require('request');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// TODO: need to populate mongodb with list of artists
// get a list of artists from database
app.get('/artists', (req, res) => {
  let myArtists = ['matchbox twenty', 'killers'];

  res.send(myArtists);
});

// return an object with an 'id' (which can be searched on Spotify) and 'name'
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

// returns an array of Album objects
app.get('/albums/:artistID', (req, res) => {
  let artistID = req.params.artistID;
  // let myUrl = 'https://api.spotify.com/v1/artists/' +
  //           artistID + '/albums?limit=10';

  // TODO clear out test URL
  let myUrl = 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?limit=5';

  // hit spotify API
  request(myUrl, (error, response, body) => {
    if(!error && response.statusCode == 200) {

      // jsonData will hold an array of albums
      let jsonData = JSON.parse(body)['items'];

      // myAlbums will hold an array of Album objects
      // Album object will hold 'id', 'name' and 'image'
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

// TODO get tracks from album


const server = app.listen(3000, () => {
  console.log('Express server running...');
})
