// itunes.js -- produce name/artist text from iTunes store page
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  if (window.location.host.indexOf("itunes.apple.com") === -1) return;

  const badNames = [
    "Continuous Mix",
    "Digital Booklet",
  ];

  function elContent(selector) {
    var els = Array.from(document.querySelectorAll(selector));
    return els.map( el => el.textContent );
  }

  var names = elContent("td.name span.text").filter((name) => {
    var truths = badNames.map( badName => name.indexOf(badName) === -1 );
    return truths.indexOf(false) === -1;
  });
  var artists = elContent("td.artist span.text").slice(0, names.length);

  var tracks = names.map((_, i) => {
    var s = (i + 1).toString();
    var trackNum = "0".repeat(3 - s.length) + s;
    return trackNum + " " + artists[i] + " - " + names[i];
  });
  window.trackList = tracks.join("\n");
  console.log(window.trackList);
})();
