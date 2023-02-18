// olark.js -- hide Olark chat box
//
// Copyright (C) 2015-2023 Dan Poggi
//
// This software may be modified and distributed under the terms of the
// BSD Zero Clause License. See the LICENSE file for details.

(function() {
  if (typeof olark !== "undefined") {
    olark("api.box.hide");
  }
})();
