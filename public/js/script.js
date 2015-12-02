'use strict'

let myArtists = ['billy joel', 'cher', 'madonna', 'killers'];

$(function() {
  $('#artist').click(() => {
    let myArtistIdArray = [];
    let myAlbumIdArray  = [];
    let myTracksArray   = [];

    let deferredArtistId = getArtistIdPromises(myArtists, myArtistIdArray);

    // When all Artist Id's are stored, get each album from the artist
    $.when.apply($, deferredArtistId).done(() => {
      console.log('All artist ID\'s retrieved');

      let deferredAlbumId = getAlbumsPromises(myArtistIdArray, myAlbumIdArray);

      // When all Album Id's are stored, get each track from the album
      $.when.apply($, deferredAlbumId).done(() => {
        console.log('All album ID\'s retrieved');

        let deferredTrackId = getTracksPromises(myAlbumIdArray, myTracksArray);

        // When all Track information is stored...
        $.when.apply($, deferredTrackId).done(() => {
          console.log('All track information retrieved');
          console.log(myTracksArray);

        }); // close $.when for getting Track information
      }); // close $.when for getting Album ID's
    }); // close $.when for getting Artist ID's
  }); // close $('artist').click event

});

// 'artistArray' holds an array of artist names
// 'compiledArray' will hold all returned Artist ID's
// method will return an array of AJAX calls
let getArtistIdPromises = function(artistArray, compiledArray) {
  let deferreds = [];

  for(let i = 0, j = artistArray.length; i < j; i++) {
    let newRequest = $.ajax({
      url: 'artistID/' + artistArray[i]
    }).done((data) => {
      compiledArray.push(data['id']);
    });

    deferreds.push(newRequest);
  }

  return deferreds;
}

// 'artistIDArray' holds an array of artist ID's
// 'compiledArray' will hold all returned Album ID's
// method will return an array of AJAX calls
let getAlbumsPromises = function(artistIdArray, compiledArray) {
  let deferreds = [];

  for(let i = 0, j = artistIdArray.length; i < j; i++) {
    let newRequest = $.ajax({
      url: 'albums/' + artistIdArray[i]
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

let getTracksPromises = function(albumIdArray, compiledArray) {
  let deferreds = [];

  for(let i = 0, j = albumIdArray.length; i < j; i++) {
    let newRequest = $.ajax({
      url: 'tracks/' + albumIdArray[i]
    }).done((data) => {
      // data returns an array of Track objects
      for(let i = 0, j = data.length; i < j; i++) {
        compiledArray.push(data[i]['title']);
      }

    });

    deferreds.push(newRequest);
  }

  return deferreds;
}
