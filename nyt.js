(function () {
  var href, search;

  if (window.location.host.indexOf("nytimes.com") !== -1) {
    href = window.location.href;
    search = window.location.search;

    if (search.length > 0) {
      href = href.replace(search, "");
    }
    window.location.href = href + "?nl=todaysheadlines";
  }
})();
