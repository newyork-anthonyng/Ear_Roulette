'use strict'

let myArtists = ['billy joel', 'cher', 'madonna'];

$(function() {
  $('#artist').click(() => {
    let myArtistIdArray = [];
    let myAlbumIdArray  = [];

    let deferredArtistId = getArtistIdPromises(myArtists, myArtistIdArray);

    $.when.apply($, deferredArtistId).done(() => {
      // When all Artist Id's are stored, get each album from the artist
      // ...and store into myAlbumIdArray
      console.log('All artist ID\'s retrieved');
      console.log(myArtistIdArray);
      let deferredAlbumId = getAlbumsPromises(myArtistIdArray, myAlbumIdArray);

      $.when.apply($, deferredAlbumId).done(() => {
        console.log('All album ID\'s retrieved');
        console.log(myAlbumIdArray);

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
let getAlbumsPromises = function(artistIDArray, compiledArray) {
  console.log('getting album promises');
  let deferreds = [];

  for(let i = 0, j = artistIDArray.length; i < j; i++) {
    let newRequest = $.ajax({
      url: 'albums/' + artistIDArray[i]
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
