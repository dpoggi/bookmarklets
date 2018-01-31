// sfchron.js -- bypass SF Chronicle paywall
//
// Copyright (C) 2018 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  var ids, i, el;

  if (window.location.host.indexOf("sfchronicle.com") === -1) {
    return;
  }

  ids = ["syncronexOverlay", "syncronexOverlayContainer"];
  for (i in ids) {
    el = document.getElementById(ids[i]);
    el.parentNode.removeChild(el);
  }
})();
