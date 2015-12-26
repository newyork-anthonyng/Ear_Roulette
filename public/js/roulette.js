'use strict'

var myApp = angular.module('Roulette', []);

// *** roulette controller *** //
myApp.controller('RouletteController', RouletteController);

function RouletteController($timeout, spotifyFactory) {
  let self = this;

  self.trackTitle   = '';
  self.trackArtist  = '';
  self.trackImage   = '';
  self.trackPreview = '';

  init();

  self.startPlayer = function() {
    if(spotifyFactory.tracksLoaded) {
      self.createPlayer();
    }
  };

  self.createPlayer = function() {
    // use $timeout to force a $scope.$apply
    $timeout(() => {

      let currentSong = spotifyFactory.getCurrentSong();
      self.trackTitle   = currentSong['trackTitle'];
      self.trackArtist  = currentSong['trackArtist'];
      self.trackImage   = currentSong['albumImage'];
      self.trackPreview = currentSong['trackPreview'];

      let audioPlayer = $('<audio />', { controls: 'controls',
                                         autoPlay: 'autoPlay' });

      let source = $('<source />').attr('src', self.trackPreview)
                   .appendTo(audioPlayer);

      audioPlayer.on('ended', () => {
        self.createPlayer();
      });

      $('.player').empty().append(audioPlayer);
    });
  };

  // *** Get songs when application is loaded *** //
  function init() {
    spotifyFactory.getTracks();
  }
}

// *** factory *** //
myApp.factory('spotifyFactory', function($http) {
  let factory = {};
  let artistNameArray = ['One Direction', 'Fall Out Boy'];
  let artistIdArray   = [];
  let albumIdArray    = [];
  let trackArray      = [];

  let tracksLoaded = false;
  let currentTrack = 0;

  factory.tracksLoaded = function() {
    return tracksLoaded;
  };

  factory.getCurrentSong = function() {
    return trackArray[currentTrack++];
  };

  factory.getTracks = function() {

    // get artist Id's
    let deferredArtistId = factory.getArtistIdPromises(artistNameArray, artistIdArray);
    $.when.apply($, deferredArtistId).done(() => {

      // get album Id's
      let deferredAlbumId = factory.getAlbumsPromises(artistIdArray, albumIdArray);
      $.when.apply($, deferredAlbumId).done(() => {

        // go through each album and get tracks
        let myAlbums = [];
        for(let i = 0, j = albumIdArray.length; i < j; i++) {
          myAlbums = myAlbums.concat(albumIdArray[i].albums);
        }

        // get track objects
        let deferredTrackId = factory.getTracksPromises(myAlbums, trackArray);
        $.when.apply($, deferredTrackId).done(() => {
          tracksLoaded = true;
          return factory.shuffle(trackArray);

        });  // end of deferredTrackId

      });  // end of deferredAlbumId

    });  // end of deferredArtistId

  };

  // *** take an array of Album Id objects, and return Tracks *** //
  factory.getTracksPromises = function(albumIdArray, compiledArray) {
    let deferreds = [];

    for(let i = 0, j = albumIdArray.length; i < j; i++) {
      // need IIFE to keep track of which Album we are on to get Album Image
      (function getTrackObjects(index) {
        let myUrl = '/spotify/tracks?albumId=' + albumIdArray[index]['albumId'];

        let newRequest = $.ajax({
          url: myUrl
        }).done((data) => {
          // parse through each of the tracks in array
          for(let i = 0, j = data.tracks.length; i < j; i++) {
            let myTrack = data.tracks[i];
            myTrack['albumImage'] = albumIdArray[index]['albumImage'];
            compiledArray.push(myTrack);
          }
        });

        deferreds.push(newRequest);
      })(i);
    }

    return deferreds;
  }

  // *** take an array of Artist Id objects, and return Album Ids *** //
  factory.getAlbumsPromises = function(artistIdArray, compiledArray) {
    let deferreds = [];

    for(let i = 0, j = artistIdArray.length; i < j; i++) {
      let myUrl = '/spotify/albums?artistId=' + artistIdArray[i]['artistId'];

      let newRequest = $.ajax({
        url: myUrl
      }).done((data) => {
        compiledArray.push(data);
      });

      deferreds.push(newRequest);
    }

    return deferreds;
  }

  // *** take an array of Artist Names, and return Artist Ids *** //
  factory.getArtistIdPromises = function(artistNameArray, compiledArray) {
    let deferreds = [];

    for(let i = 0, j = artistNameArray.length; i < j; i++) {
      let myUrl = '/spotify/artist?artistName=' + artistNameArray[i];

      let newRequest = $.ajax({
        url: myUrl
      }).done((data) => {
        compiledArray.push(data);
      });

      deferreds.push(newRequest);
    }

    return deferreds;
  };

  factory.shuffle = function(array) {
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

  return factory;
});

// *** User controller *** //
myApp.controller('UserController', UserController);

function UserController($http) {
  let self = this;

  self.signup = function() {

    let data = {
      name:     self.newUser.name,
      password: self.newUser.password
    };

    let myUrl = '/user/new';

    $http.post(myUrl, data)
      .then((response) => {
        // authenticate new user if it was created successfully
        if(response.data.SUCCESS) {
          let data = response.data;

          let userData = {
            name: data.name,
            password: data.password
          };

          this.authenticateUser(userData);
          // clear out signup information
          self.newUser.name     = '';
          self.newUser.password = '';
        }
      });
  };

  self.login = function() {

    let userData = {
      name:     self.user.name,
      password: self.user.password
    };

    this.authenticateUser(userData);
    // clear out login information
    self.user.name     = '';
    self.user.password = '';
  };

  self.authenticateUser = function(data) {
    let myUrl = '/user/authenticate';

    $http.post(myUrl, data)
      .success(function(data, status, headers, config) {
        console.log(data);
        if(data['SUCCESS']) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.user.name);
        }
      })
      .error(function(data, status, headers, config) {
        console.log(data);
        // delete local storage
        delete localStorage.token;
        delete localStorage.user;
      });
  };

};

// app.controller('RouletteController', function($http, $interval, $timeout) {
//
//   this.loggedIn = false;
//
//   // likedSongs will be an array of Song objects, which have...
//   // keys of "title" and "artist"
//   this.likedSongs = [];
//   this.currentSong = {
//     title: '',
//     artist: '',
//     image: '',
//     preview: ''
//   };
//
//
//   this.likeSong = function() {
//     let myUrl = '/player/like';
//
//     let title  = this.songTitle;
//     let artist = this.songArtist;
//     let user   = localStorage['user'];
//
//     console.log('inside of likeSong');
//     console.log(title, artist);
//
//     // check if we already have song favorited
//     for(let i = 0, j = this.likedSongs.length; i < j; i++) {
//       let sameTitle  = this.likedSongs[i]['title'] === title;
//       let sameArtist = this.likedSongs[i]['artist'] === artist;
//
//       if(sameTitle & sameArtist) return false;
//     }
//
//     let data = {
//       title:  title,
//       artist: artist,
//       user:   user
//     };
//
//     $http.post(myUrl, data)
//       .then((response) => {
//         this.likedSongs = response.data;
//       });
//   };
//
//   this.deleteSong = function(index) {
//     // delete song from our database
//     let myUrl = 'player/dislike';
//
//     let title  = this.likedSongs[index]['title'];
//     let artist = this.likedSongs[index]['artist'];
//     let user   = localStorage['user'];
//
//     let data = {
//       title:  title,
//       artist: artist,
//       user:   user
//     }
//
//     $http.post(myUrl, data)
//       .then((response) => {
//         // delete song from controller's array
//         this.likedSongs.splice(index, 1);
//       });
//   };
//
//   this.login = function() {
//     console.log('login button clicked');
//
//     let name = this.login_name;
//     let password = this.login_password;
//
//     let data = {
//       name: name,
//       password: password
//     };
//
//     this.authenticateUser(data);
//   };
//
//   this.logout = function() {
//     localStorage.setItem('token', undefined);
//     localStorage.setItem('user', undefined);
//
//     this.loggedIn = false;
//     this.likedSongs = [];
//     this.currentSong = {
//       title:   '',
//       artist:  '',
//       image:   '',
//       preview: ''
//     };
//
//     $http.get('player/destroy');
//   };
//
//   this.signup = function() {
//     let name     = this.signup_name;
//     let password = this.signup_password;
//
//     let data = {
//       name:     name,
//       password: password
//     }
//
//     let myUrl = '/user/new';
//
//     $http.post(myUrl, data)
//       .then((response) => {
//         if(response.data.success) {
//           let data = response.data;
//
//           // generate token with newly created user
//           let name     = data.name;
//           let password = data.password;
//
//           let userData = {
//             name:     name,
//             password: password
//           };
//
//           this.authenticateUser(userData);
//         }
//       });
//   };
//
//   this.getFavoriteSongs = function() {
//     let myUrl = '/player/favorites';
//
//     let data = {
//       user: localStorage['user']
//     };
//
//     $http.post(myUrl, data)
//       .then((response) => {
//         this.likedSongs = response.data;
//       });
//   };
//
//   this.authenticateUser = function(data) {
//     let myUrl = '/user/authenticate';
//
//     $http.post(myUrl, data)
//       .then((response) => {
//         let data = response.data;
//
//         if(data['success']) {
//           // if login was successful, then show the player and hide login page
//           localStorage.setItem('token', data.token);
//           localStorage.setItem('user', data.user.name);
//
//           // show favorite songs from user
//           this.loggedIn = true;
//           this.getFavoriteSongs();
//
//           // clear out DOM login screen username and password
//           this.login_name      = '';
//           this.login_password  = '';
//           this.signup_name     = '';
//           this.signup_password = '';
//         }
//       });
//   }
// });
