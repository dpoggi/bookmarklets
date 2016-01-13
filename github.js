// github.js -- unsubscribe from GitHub repos meeting particular criteria
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  var org, substr, els;
  if (window.location.host.indexOf("github.com") === -1) return;

  org = prompt("Organization:");
  substr = prompt("Substring:");

  els = [].slice.call(document.querySelectorAll("li.js-subscription-row"));
  els.forEach(function(el) {
    var slug, tokens, user, repo, btn;

    slug = el.querySelector("a").textContent.trim();
    tokens = slug.split("/");
    user = tokens[0]
    repo = tokens[1];
    btn = el.querySelector("form.js-unsubscribe-form button");

    // Will prompt to unsubscribe from repos not from org organization, or
    // ones that are from org organization but contain substr substring.
    if (user.indexOf(org) === -1 ||
        repo.toLowerCase().indexOf(substr) !== -1) {
      if (confirm("Does you wanna unsubscribe " + slug + "???")) {
        btn.click();
      }
    }
  });
})();
