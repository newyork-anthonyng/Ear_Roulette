'use strict'

var myApp = angular.module('Roulette', ['ui.router']);

// *** roulette controller *** //
myApp.controller('RouletteController', RouletteController);

function RouletteController($http, $timeout, $interval, spotifyFactory, UserService) {
  let self = this;

  self.trackTitle   = '';
  self.trackArtist  = '';
  self.trackImage   = '';
  self.trackPreview = '';
  self.favoriteTracks = [];

  self.playing = false;
  self.tracksLoaded = false;

  init();

  // check if tracks are loaded
  var myPromise = $interval(function() {
    if(spotifyFactory.tracksLoaded()) self.tracksLoaded = true;
  }, 1000);

  self.startPlayer = function() {
    if(spotifyFactory.tracksLoaded()) {
      self.createPlayer();
      self.getFavoriteSongs();

      self.playing = true;
      $interval.cancel(myPromise);
    }
  };

  self.createPlayer = function() {
    // use $timeout to force a $scope.$apply
    $timeout(() => {

      let currentSong   = spotifyFactory.getCurrentSong();
      self.trackTitle   = currentSong['trackTitle'];
      self.trackArtist  = currentSong['trackArtist'];
      self.trackImage   = currentSong['albumImage'];
      self.trackPreview = currentSong['trackPreview'];

      let audioPlayer = $('<audio />', { autoPlay: 'autoPlay' });

      let source = $('<source />').attr('src', self.trackPreview)
                   .appendTo(audioPlayer);

      audioPlayer.on('ended', () => {
        self.createPlayer();
      });

      $('.player').empty().append(audioPlayer);
    });
  };

  self.likeSong = function() {
    let data = {
      username:    UserService.getCurrentUser(),
      trackTitle:  self.trackTitle,
      trackArtist: self.trackArtist
    };

    // check if song is already part of our favorite songs
    for(let i = 0, j = self.favoriteTracks.length; i < j; i++) {
      let currentSong = self.favoriteTracks[i];

      let titleMatches  = currentSong.trackTitle === self.trackTitle;
      let artistMatches = currentSong.trackArtist === self.trackArtist;

      if(titleMatches && artistMatches) return;
    }

    let myUrl = '/user/like';

    $http.post(myUrl, data)
      .then((response) => {
        if(response.data.SUCCESS) self.getFavoriteSongs();
      });
  };

  self.dislikeSong = function(index) {
    let mySong = self.favoriteTracks[index];

    let data = {
      username:    UserService.getCurrentUser(),
      trackTitle:  mySong['trackTitle'],
      trackArtist: mySong['trackArtist']
    };

    let myUrl = '/user/dislike';

    $http.post(myUrl, data)
      .then((response) => {
        if(response.data.SUCCESS) self.getFavoriteSongs();
      });
  };

  self.getFavoriteSongs = function() {
    let username = UserService.getCurrentUser();

    let myUrl = '/user/favorites?username=' + username;

    $http.get(myUrl)
      .then((response) => {
        self.favoriteTracks = response['data']['tracks'];
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
  let artistNameArray = ['Adele', 'One Direction', 'Fall Out Boy', 'Eminem',
                         'Young the Giant', 'Killers', 'Pink', 'Jay Z',
                         'Kanye West', 'Linkin Park', 'Shawn Mendes',
                         'Ed Sheeran', 'All American Rejects', 'Good Charlotte',
                         'NSync', 'OneRepublic', 'Arctic Monkeys', 'Backstreet Boys'
                        ];
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

function UserController($http, UserService) {
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

  self.logout = function() {
    UserService.logout();
  };

  self.authenticateUser = function(data) {
    let myUrl = '/user/authenticate';

    $http.post(myUrl, data)
      .success(function(data, status, headers, config) {
        if(data['SUCCESS']) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.user.name);

          UserService.setLoggedIn();
        }
      })
      .error(function(data, status, headers, config) {
        UserService.emptyLocalStorage();
      });
  };

};

// *** UI Router *** //
myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '../partial/login.html',
      authenticate: false
    })
    .state('home', {
      url: '/home',
      templateUrl: '../partial/home.html',
      authenticate: true
    });

    $urlRouterProvider.otherwise('/login');
});

// *** authentication for UI Router *** //
angular.module('Roulette').run(function($rootScope, $state, UserService) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if(toState.authenticate && !UserService.getLoggedIn()) {
      $state.transitionTo('login');
      event.preventDefault();
    }
  });
});

// *** User Service *** //
myApp.factory('UserService', function($state) {
  let UserService = {};
  let loggedIn = false;

  UserService.getLoggedIn = function() {
    return loggedIn;
  };

  UserService.setLoggedIn = function() {
    loggedIn = true;
    $state.go('home');
  };

  UserService.logout = function() {
    loggedIn = false;
    UserService.emptyLocalStorage();
    $state.go('login');
  };

  UserService.getCurrentUser = function() {
    return localStorage.user;
  };

  UserService.emptyLocalStorage = function() {
    delete localStorage.token;
    delete localStorage.user;
  };

  return UserService;
});
