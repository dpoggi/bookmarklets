// nyt.js -- redirect past New York Times paywall
//
// Copyright (C) 2015-2023 Dan Poggi
//
// This software may be modified and distributed under the terms of the
// BSD Zero Clause License. See the LICENSE file for details.

(function() {
  var href;
  if (window.location.host.indexOf("nytimes.com") === -1) {
    return;
  }

  href = window.location.href;
  if (window.location.search.length > 0) {
    href = href.replace(window.location.search, "");
  }
  window.location.href = href + "?nl=todaysheadlines";
})();
