// fp.js -- remove DOM elements from foreignpolicy.com paywall
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  if (window.location.host.indexOf("foreignpolicy.com") === -1) {
    return;
  }

  ["TB_overlay", "TB_window"].forEach(function(id) {
    var el;
    el = document.getElementById(id);
    if (el !== null) {
      el.parentElement.removeChild(el);
    }
  });
  document.body.className = "tb-enabled";
})();
