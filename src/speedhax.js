// speedhax.js -- set the video element's playbackRate on Skillo
//
// Copyright (C) 2019 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(() => {
  if (window.location.host.indexOf("myskillo.com") === -1) {
    return;
  }

  const videos = Array.from(document.getElementsByTagName("video"));

  for (let video of videos) {
    video.playbackRate = 4;
  }
})();
