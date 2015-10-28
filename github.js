(function () {
  if (window.location.host.indexOf("github.com") === -1) return;

  $("li.js-subscription-row").each(function (idx, li) {
    var $li, slug, tokens, user, repo, $btn;

    $li = $(li);
    slug = $($li.find("a")[0]).text().trim();
    tokens = slug.split("/");
    user = tokens[0];
    repo = tokens[1];
    $btn = $($li.find("form.js-unsubscribe-form button")[0]);

    if (user.indexOf("detroit-labs") === -1 ||
        repo.toLowerCase().indexOf("android") !== -1) {
      if (confirm("ARE YOU WANT BALEET " + slug + "???")) {
        $btn.click();
      }
    }
  });
})();
