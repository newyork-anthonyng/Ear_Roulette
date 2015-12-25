'use strict'

let myArtists = ['one republic', 'killers', 'nsync', 'linkin park'];

//=============================================================================
// API methods ================================================================
//=============================================================================

// returns an array of Track Objects
let getTracks = function(artistNameArray) {
  let myArtistIdArray = [];
  // myAlbumIdArray will hold 'id' and 'image' for albums
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
        // update tracks on client side
        mySongs = shuffle(myTracksArray);

        // update tracks on the server
        $.ajax({
          url: '/player/updateTracks',
          data: {'data': myTracksArray},
          method: 'POST'
        }).done(() => {
          console.log('Ready to play');
          startAudioPlayer();
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
    console.log('inside of for-loop');
    console.log(artistArray[i]);

    let newRequest = $.ajax({
      url: 'spotify/artist?artistName=' + artistArray[i]
    }).done((data) => {
      compiledArray.push(data['id']);
      console.log(data['id']);
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
  console.log('inside of getAlbumsPromises');
  console.log(artistIdArray);
  for(let i = 0, j = artistIdArray.length; i < j; i++) {
    let newRequest = $.ajax({
      url: 'spotify/albums?artistId=' + artistIdArray[i]
    }).done((data) => {
      // data returns an array of Album objects
      for(let i = 0, j = data.length; i < j; i++) {
        let newData = {
          id: data[i]['id'],
          image: data[i]['image']
        }
        compiledArray.push(newData);
      }
    });

    deferreds.push(newRequest);
  }

  return deferreds;
}

// 'albumIdArray' holds an array of album 'id' and 'image'
// 'compiledArray' will hold all returned Track objects
// method will return an array of AJAX calls
let getTracksPromises = function(albumIdArray, compiledArray) {
  let deferreds = [];

  for(let i = 0, j = albumIdArray.length; i < j; i++) {
    let newData = {
      id: albumIdArray[i]['id'],
      image: albumIdArray[i]['image']
    };

    let newRequest = $.ajax({
      url: 'spotify/tracks?albumId=' + albumIdArray[i]['id'],
      data: newData
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

// shuffle an array
let shuffle = function(array) {
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
