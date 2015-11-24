// nyt.js -- redirect past New York Times paywall
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function () {
  var href;
  if (window.location.host.indexOf("nytimes.com") === -1) return;

  if (window.location.search.length > 0) {
    href = window.location.href.replace(window.location.search, "");
  }
  window.location.href = href + "?nl=todaysheadlines";
})();
