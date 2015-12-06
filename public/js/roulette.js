'use strict'

let app = angular.module('Roulette', []);

app.controller('RouletteController', function($http, $interval) {

  this.currentlyPlaying = false;

  this.currentSong = {
    title:  '',
    artist: ''
  };

  // likedSongs will be an array of Song objects, which have...
  // keys of "title" and "artist"
  this.likedSongs = [];

  this.buttonName = function() {
    return this.currentlyPlaying ? 'Pause' : 'Play';
  };

  this.playSong = function() {
    this.currentlyPlaying = true;

    let myUrl = '/player/play'

    $http.get(myUrl)
      .then(() => {
        console.log('roulette.js = get /play');
      });
  };

  this.pauseSong = function() {
    this.currentlyPlaying = !this.currentlyPlaying;

    let myUrl = '/player/pause'

    $http.get(myUrl)
      .then(() => {
        console.log('roulette.js = get /pause');
      });
  };

  // update current song information
  this.getSong = function() {
    if(!this.currentlyPlaying) return false;
    let myUrl = '/player/currentSong';

    $http.get(myUrl)
      .then((response) => {
        let myTitle   = response.data.title;
        let myArtist  = response.data.artist;

        this.updateCurrentSong(myTitle, myArtist);
      });
  };

  this.updateCurrentSong = function(title, artist) {

    this.currentSong['title']   = title;
    this.currentSong['artist']  = artist;
  };

  this.likeSong = function() {
    let myUrl = '/player/like';

    let title = this.currentSong['title'];
    let artist = this.currentSong['artist'];
    let user = localStorage['user'];

    let data = {
      title: title,
      artist: artist,
      user: user
    };

    $http.post(myUrl, data)
      .then((response) => {
        // get user's favorite songs
        this.likedSongs = response.data;
      });
  };

  // Check for song title every second
  $interval(() => {
    this.getSong();
  }, 1000);

});
