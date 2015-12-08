'use strict'

let app = angular.module('Roulette', []);

app.controller('RouletteController', function($http, $interval, $timeout) {

  this.currentlyPlaying = false;
  this.loggedIn = false;
  this.preview = 'https://p.scdn.co/mp3-preview/251d88771e10dd8eb71fdfcf690429a85564945f';

  this.currentSong = {
    title:   '',
    artist:  '',
    image:   '',
    preview: 'https://p.scdn.co/mp3-preview/251d88771e10dd8eb71fdfcf690429a85564945f'
  };

  // likedSongs will be an array of Song objects, which have...
  // keys of "title" and "artist"
  this.likedSongs = [];

  this.buttonName = function() {
    return this.currentlyPlaying ? 'Pause' : 'Play';
  };

  this.playSong = function() {
    this.currentlyPlaying = !this.currentlyPlaying;

    // $http.get('/player/play');
  };

  // update current song information
  this.getSong = function() {
    // if(!this.currentlyPlaying) return false;
    let myUrl = '/player/currentSong';

    $http.get(myUrl)
      .then((response) => {
        this.currentSong['title']   = response.data.title;
        this.currentSong['artist']  = response.data.artist;
        this.currentSong['image']   = response.data.image;
        this.currentSong['preview'] = response.data.preview;

        console.log('inside of getSong');
        console.log(this.currentSong['preview']);
      });
  };

  this.likeSong = function() {
    let myUrl = '/player/like';

    let title  = this.currentSong['title'];
    let artist = this.currentSong['artist'];
    let user   = localStorage['user'];

    // check if we already have song favorited
    for(let i = 0, j = this.likedSongs.length; i < j; i++) {
      let sameTitle  = this.likedSongs[i]['title'] === title;
      let sameArtist = this.likedSongs[i]['artist'] === artist;

      if(sameTitle & sameArtist) return false;
    }

    let data = {
      title:  title,
      artist: artist,
      user:   user
    };

    $http.post(myUrl, data)
      .then((response) => {
        this.likedSongs = response.data;
      });
  };

  this.deleteSong = function(index) {
    // delete song from our database
    let myUrl = 'player/dislike';

    let title  = this.likedSongs[index]['title'];
    let artist = this.likedSongs[index]['artist'];
    let user   = localStorage['user'];

    let data = {
      title:  title,
      artist: artist,
      user:   user
    }

    $http.post(myUrl, data)
      .then((response) => {
        // delete song from controller's array
        this.likedSongs.splice(index, 1);
      });
  };

  this.stopSong = function() {
    this.currentlyPlaying = false;

    $http.get('player/stop');
  }

  this.login = function() {
    let name = this.login_name;
    let password = this.login_password;

    let data = {
      name: name,
      password: password
    };

    this.authenticateUser(data);
  };

  this.logout = function() {
    localStorage.setItem('token', undefined);
    localStorage.setItem('user', undefined);

    this.loggedIn = false;
    this.stopSong();
    this.likedSongs = [];
    this.currentSong = {
      title:   '',
      artist:  '',
      image:   '',
      preview: ''
    };

    $http.get('player/destroy');
  };

  this.signup = function() {
    let name     = this.signup_name;
    let password = this.signup_password;

    let data = {
      name:     name,
      password: password
    }

    let myUrl = '/user/new';

    $http.post(myUrl, data)
      .then((response) => {
        if(response.data.success) {
          let data = response.data;

          // generate token with newly created user
          let name     = data.name;
          let password = data.password;

          let userData = {
            name:     name,
            password: password
          };

          this.authenticateUser(userData);
        }
      });
  };

  this.getFavoriteSongs = function() {
    let myUrl = '/player/favorites';

    let data = {
      user: localStorage['user']
    };

    $http.post(myUrl, data)
      .then((response) => {
        this.likedSongs = response.data;
      });
  };

  this.authenticateUser = function(data) {
    let myUrl = '/user/authenticate';

    $http.post(myUrl, data)
      .then((response) => {
        let data = response.data;

        if(data['success']) {
          // if login was successful, then show the player and hide login page
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.user.name);

          // show favorite songs from user
          this.loggedIn = true;
          this.getFavoriteSongs();

          // clear out DOM login screen username and password
          this.login_name      = '';
          this.login_password  = '';
          this.signup_name     = '';
          this.signup_password = '';
        }
      });
  }

  // Check for song title every second
  let myPlayer = window.getElementById('audio-player');
  $interval(() => {
    myPlayer;
    this.getSong();
  }, 1000);


});
