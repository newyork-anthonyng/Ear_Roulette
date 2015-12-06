'use strict'

let myArtists = ['britney spears'];
let songsLoaded = false;

// get token from local storage and send it in header
function verifyToken(xhr) {
  xhr.setRequestHeader('x-access-token', localStorage['token']);
}

$(function() {
  // load all tracks for artists
  getTracks(myArtists);

  // login user and give them token
  $('#login').click(() => {
    // get username and password from index.html
    let name = $('#name').val();
    let password = $('#password').val();

    let data = {};
    data['name'] = name;
    data['password'] = password;

    $.ajax({
      url: '/user/authenticate',
      data: data,
      method: 'POST'
    }).done((data) => {
      // if login was successful, then show the player and hide the login page
      if(data['success']) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user.name);

        loginPage();
      }
    });
  }); // close out ('#login').click

  $('#logout').click(() => {
    // get rid of user token
    localStorage.setItem('token', undefined);
    localStorage.setItem('user', undefined);

    logoutPage();
  }); // close out ('#logout').click
});

// show the player page
let loginPage = function() {
  // clear user inputs
  $('#name').val('');
  $('#password').val('');

  $('#login-form').hide();
  $('#player').show();
};

let logoutPage = function() {
  $('#login-form').show();
  $('#player').hide();
};

// returns an array of Track Objects
let getTracks = function(artistNameArray) {
  let myArtistIdArray = [];
  let myAlbumIdArray  = [];
  let myTracksArray   = [];

  let deferredArtistId = getArtistIdPromises(artistNameArray, myArtistIdArray);

  // When all Artist Id's are stored, get each album from the artist
  $.when.apply($, deferredArtistId).done(() => {

    let deferredAlbumId = getAlbumsPromises(myArtistIdArray, myAlbumIdArray);

    // When all Album Id's are stored, get each track from the album
    $.when.apply($, deferredAlbumId).done(() => {

      let deferredTrackId = getTracksPromises(myAlbumIdArray, myTracksArray);

      // When all Track information is stored...
      $.when.apply($, deferredTrackId).done(() => {
        // update tracks on the server
        $.ajax({
          url: '/player/updateTracks',
          data: {'data': myTracksArray}
        }).done(() => {
          console.log('Ready to play');
          songsLoaded = true;
        });

      }); // close $.when for getting Track information
    }); // close $.when for getting Album ID's
  }); // close $.when for getting Artist ID's
}

// 'artistArray' holds an array of artist names
// 'compiledArray' will hold all returned Artist ID's
// method will return an array of AJAX calls
let getArtistIdPromises = function(artistArray, compiledArray) {
  let deferreds = [];

  for(let i = 0, j = artistArray.length; i < j; i++) {
    let newRequest = $.ajax({
      url: 'api/artistID/' + artistArray[i]
    }).done((data) => {
      compiledArray.push(data['id']);
    });

    deferreds.push(newRequest);
  }

  return deferreds;
}

// 'artistIdArray' holds an array of artist ID's
// 'compiledArray' will hold all returned Album ID's
// method will return an array of AJAX calls
let getAlbumsPromises = function(artistIdArray, compiledArray) {
  let deferreds = [];

  for(let i = 0, j = artistIdArray.length; i < j; i++) {
    let newRequest = $.ajax({
      url: 'api/albums/' + artistIdArray[i]
    }).done((data) => {
      // data returns an array of Album objects
      for(let i = 0, j = data.length; i < j; i++) {
        compiledArray.push(data[i]['id']);
      }

    });

    deferreds.push(newRequest);
  }

  return deferreds;
}

// 'albumIdArray' holds an array of album ID's
// 'compiledArray' will hold all returned Track objects
// method will return an array of AJAX calls
let getTracksPromises = function(albumIdArray, compiledArray) {
  let deferreds = [];

  for(let i = 0, j = albumIdArray.length; i < j; i++) {
    let newRequest = $.ajax({
      url: 'api/tracks/' + albumIdArray[i]
    }).done((data) => {
      // data returns an array of Track objects
      for(let i = 0, j = data.length; i < j; i++) {
        compiledArray.push(data[i]);
      }

    });

    deferreds.push(newRequest);
  }

  return deferreds;
}
