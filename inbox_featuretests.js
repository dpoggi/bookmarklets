// inbox_featuretests.js -- check if your SSB app supports modern JS
//
// *NOT A BOOKMARKLET*, to be used with site-specific browsers
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  function featureAlert(feature) {
    alert("Missing support for " + feature + "! Script will not work!");
  }

  if (typeof Array.prototype.filter === "undefined") {
    featureAlert("Array.prototype.filter");
  }
  if (typeof MutationObserver === "undefined") {
    featureAlert("MutationObserver");
  }
})();
