// itunes.js -- produce name/artist text from iTunes store page
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  if (window.location.host.indexOf("itunes.apple.com") === -1) {
    return;
  }

  const badNames = [
    "Continuous Mix",
    "Digital Booklet"
  ];

  function elContent(selector) {
    return Array.from(document.querySelectorAll(selector))
                .map(el => el.textContent);
  }

  let album = document.querySelector("div#title h1").textContent;
  let albumArtist = document.querySelector("div#title h2").textContent;
  let releaseDate = document.querySelectorAll("li.release-date span")[1].textContent;

  let names = elContent("td.name span.text").filter((name) => {
    return !badNames.map(badName => name.includes(badName)).includes(true);
  });
  let artists = elContent("td.artist span.text").slice(0, names.length);

  let tracks = names.map((_, i) => {
    let s = (i + 1).toString();
    let trackNum = "0".repeat(3 - s.length) + s;
    return trackNum + " " + artists[i] + " - " + names[i];
  });

  window.trackList = album + "\n"
                     + albumArtist + "\n"
                     + releaseDate + "\n\n"
                     + tracks.join("\n");
  console.log(window.trackList);
})();
