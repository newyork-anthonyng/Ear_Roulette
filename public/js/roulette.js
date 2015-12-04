'use strict'

let app = angular.module('Roulette', []);

app.controller('RouletteController', function($http, $interval) {

  this.currentlyPlaying = false;

  this.currentSong = {
    title:  '',
    artist: ''
  }

  this.playSong = function() {
    this.currentlyPlaying = true;

    let myUrl = '/play'

    $http.get(myUrl)
      .then(() => {
        console.log('roulette.js = get /play');
      });
  };

  this.pauseSong = function() {
    this.currentlyPlaying = !this.currentlyPlaying;

    let myUrl = '/pause'

    $http.get(myUrl)
      .then(() => {
        console.log('roulette.js = get /pause');
      });
  };

  // update current song information
  this.getSong = function() {
    if(!this.currentlyPlaying) return false;
    let myUrl = '/currentSong';

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

  // Check for song title every second
  $interval(() => {
    console.log('tick');
    this.getSong();
  }, 1000);

});
