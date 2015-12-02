'use strict'

let myArtists = ['billy joel', 'cher', 'madonna'];

$(function() {
  $('#artist').click(() => {
    let myArtistId = [];
    let deferreds = getArtistIdPromises(myArtists, myArtistId);

    $.when.apply($, deferreds).done(function(data) {
      console.log(myArtistId);
    });
  });

});

// 'artistArray' holds an array of artist names
// 'compiledArray' is the array which will hold all of your artist data
// method will return an array of AJAX calls
let getArtistIdPromises = function(artistArray, compiledArray) {
  let deferreds = [];

  for(let i = 0, j = artistArray.length; i < j; i++) {
    let newRequest = $.ajax({
      url: 'artistID/' + artistArray[i]
    }).done((data) => {
      compiledArray.push(data);
    });

    deferreds.push(newRequest);
  }

  return deferreds;
}
