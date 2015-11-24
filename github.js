// github.js -- unsubscribe from GitHub repos meeting particular criteria
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function () {
  if (window.location.host.indexOf("github.com") === -1) return;

  $("li.js-subscription-row").each(function (idx, li) {
    var $li, slug, tokens, user, repo, $btn, org, substr;

    $li = $(li);
    slug = $($li.find("a")[0]).text().trim();
    tokens = slug.split("/");
    user = tokens[0];
    repo = tokens[1];
    $btn = $($li.find("form.js-unsubscribe-form button")[0]);

    // Will prompt to unsubscribe from repos not from org organization, or
    // ones that are from org organization but contain substr substring.
    org = prompt("Organization:");
    substr = prompt("Substring:");

    if (user.indexOf(org) === -1 ||
        repo.toLowerCase().indexOf(substr) !== -1) {
      if (confirm("Does you wanna unsubscribe " + slug + "???")) {
        $btn.click();
      }
    }
  });
})();
