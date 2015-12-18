'use strict'

let Utility = {
  // *** Parse through query string *** //
  parseQueryString: function(url) {
    // replace commas
    let formattedUrl = url.replace(/%2C/g, ',');
    let queryString = formattedUrl.split('?')[1];

    if(!queryString) return false;

    let queryArray = queryString.split('&');
    let myData     = {};

    for(let i = 0, j = queryArray.length; i < j; i++) {
      let currentQuery = queryArray[i].split('=');

      myData[currentQuery[0]] = currentQuery[1];
    }

    return myData;
  }
}

module.exports = Utility;
