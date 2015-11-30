// itunes.js -- produce name/artist text from iTunes store page
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function () {
  var trackNums, names, artists, i, output;

  function scrapeData(selector) {
    var els;
    els = document.querySelectorAll(selector);
    return Array.prototype.slice.call(els).map(function(el) {
      return el.textContent;
    });
  }

  trackNums = scrapeData("td.index span.index").map(function(num) {
    if (num.length === 1) {
      return "00" + num;
    } else if (num.length === 2) {
      return "0" + num;
    } else {
      return num;
    }
  });
  names = scrapeData("td.name span.text");
  artists = scrapeData("td.artist span.text");

  output = "";
  for (i = 0; i < names.length; i++) {
    if (names[i].indexOf("Continuous Mix") !== -1 ||
        names[i].indexOf("Digital Booklet") !== -1) {
      continue;
    }

    if (i > 0) {
      output += "\n";
    }
    output += trackNums[i] + " " + artists[i] + " - " + names[i];
  }

  window.trackListText = output;
  console.log(output);
})();
