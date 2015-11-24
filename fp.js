// fp.js -- remove DOM elements from foreignpolicy.com paywall
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function () {
  var els, el, i;
  if (window.location.host.indexOf("foreignpolicy.com") === -1) return;

  els = ["TB_overlay", "TB_window"];
  for (i in els) {
    el = document.getElementById(els[i]);
    if (el !== null) {
      el.parentElement.removeChild(el);
    }
  }
  document.body.className = "tb-enabled";
})();
