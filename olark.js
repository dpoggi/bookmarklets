// olark.js -- hide Olark chat box
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function () {
  if (typeof(olark) !== "undefined") {
    olark("api.box.hide");
  }
})();
