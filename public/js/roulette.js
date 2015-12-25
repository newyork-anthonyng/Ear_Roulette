'use strict'

var myApp = angular.module('Roulette', []);

// *** controller *** //
myApp.controller('RouletteController', RouletteController);

function RouletteController(spotifyFactory) {
  let self = this;

  init();

  function init() {
    spotifyFactory.getTracks();
  }
}


// *** factory *** //
myApp.factory('spotifyFactory', function($http) {
  let factory = {};
  let artistNameArray = ['Killers', 'Maroon 5'];
  let artistIdArray   = [];
  let albumIdArray    = [];
  let trackArray      = [];

  factory.getTracks = function() {
    // get the artist Id's
    let deferredArtistId = factory.getArtistIdPromises(artistNameArray, artistIdArray);

    $.when.apply($, deferredArtistId).done(() => {
      console.log('retrieved all artist IDs');
      console.log(artistIdArray);

      let deferredAlbumId = factory.getAlbumsPromises(artistIdArray, albumIdArray);

      $.when.apply($, deferredAlbumId).done(() => {
        console.log('retrieved all albums');
        console.log(albumIdArray);

        
      });

    });

  };

  // *** take an array of Album Id objects, and return Tracks *** //
  factory.getTracksPromises = function(albumIdArray, compiledArray) {
    let deferreds = [];

    for(let i = 0, j = albumIdArray.length; i < j; i++) {
      let myUrl = '/spotify/tracks?albumId=' + albumIdArray[i]['albumId'];

      let newRequest = $.ajax({
        url: myUrl
      }).done((data) => {
        compiledArray.push(data);
      });

      deferreds.push(newRequest);
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

  return factory;
});

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
//   // update current song information
//   this.getSong = function() {
//     let myUrl = '/player/currentSong';
//
//     $http.get(myUrl)
//       .then((response) => {
//         this.currentSong['title']   = response.data.title;
//         this.currentSong['artist']  = response.data.artist;
//         this.currentSong['image']   = response.data.image;
//         this.currentSong['preview'] = response.data.preview;
//       });
//   };
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
//
//   // Check for song title every second
//   $interval(() => {
//     this.getSong();
//   }, 1000);
// });
