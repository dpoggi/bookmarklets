// eastlansing.js -- download ordinances from the City of East Lansing
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function () {
  var interval, searchLinks, expressions, links, closureFactory, i;
  if (window.location.host.indexOf("cityofeastlansing.com") === -1) return;

  interval = 2.5; // seconds

  searchLinks = function (selector, re) {
    var result, matches;

    result = [];

    jQuery(selector).each(function (idx, a) {
      var $a = jQuery(a);
      matches = $a.text().match(re);
      if (matches !== null) result.push($a);
    });

    return result;
  };

  links = searchLinks("a", /^DOWNLOAD$/);
  if (links.length === 0) links = searchLinks("a", /^Ordinance /);
  if (links.length === 0) links = searchLinks("p a", /^[0-9]{3}/);
  if (links.length === 0) return;

  closureFactory = function ($a) {
    return function () {
      window.location.href = $a.attr("href");
    };
  };

  for (i = 0; i < links.length; i++) {
    setTimeout(closureFactory(links[i]), i * interval * 1000);
  }
})();
