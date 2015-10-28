(function () {
  var interval, searchLinks, expressions, links, closureFactory, i;

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
