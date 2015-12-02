'use strict'

let myArtists = ['billy joel', 'cher', 'madonna'];

$(function() {
  $('#artist').click(() => {
    console.log('button clicked');
    // let i = 0;
    // getArtistID(i);
    getArtistId(myArtists);
  });
});

let getArtistId = function(artistArray) {

  $.ajax({
    url: '/artistID/' + artistArray[0]
  }).done((artist) => {
    console.log(artist['name'] + ': ' + artist['id']);
  });

  // make a copy of artist array
  // remove the first artist from the array and call getArtistId again
  let myArtistArray = artistArray;
  myArtistArray.splice(0, 1);

  if(myArtistArray.length > 0) {
    getArtistId(myArtistArray);
  } else {
    return true;
  }
}
